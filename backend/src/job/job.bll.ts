import { FilterData } from "../ext/parse_data";
import { JobNS } from "../job/job";
import { UserNS } from "../user/user";

export class JobBLLBase implements JobNS.BLL {
    constructor(
        private dal: JobNS.DAL,
        private UserBLL: UserNS.BLL,
        private UserDAL: UserNS.DAL
    ) { }

    async init() { }

    async ListJob() {
        const docs = await this.dal.ListJob();
        const jobs = FilterData<JobNS.Job>(docs);
        return jobs;
    }

    async GetJob(id: string) {
        const job = await this.dal.GetJob(id);
        if (!job) {
            throw JobNS.Errors.JobNotFound;
        }
        return job;
    }

    async CreateJob(params: JobNS.CreateJobParams) {
        const now = Date.now();
        const job: JobNS.Job = {
            id: JobNS.Generator.NewJobId(),
            name: params.name,
            status: JobNS.Status.New,
            progress: 0,
            deadline: params.deadline,
            ctime: now,
            mtime: now,
        };
        await this.dal.CreateJob(job);
        return job;
    }

    async UpdateJob(id: string, params: JobNS.UpdateJobParams) {
        const job = await this.GetJob(id);
        const doc = { ...job, ...params }
        doc.mtime = Date.now();
        await this.dal.UpdateJob(doc);
        return doc;
    }

    async DeleteJob(id: string) {
        const doc = await this.GetJob(id);
        doc.dtime = Date.now();
        await this.dal.UpdateJob(doc);
        return doc;
    }

    async ListModule(query: JobNS.Query) {
        const docs = await this.dal.ListModule(query);
        const jobs = FilterData<JobNS.Module>(docs);
        return jobs;
    }

    async GetModule(id: string) {
        const job = await this.dal.GetModule(id);
        if (!job) {
            throw JobNS.Errors.ModuleNotFound;
        }
        return job;
    }

    async CreateModule(params: JobNS.CreateModuleParams) {
        await this.GetJob(params.job_id);
        const now = Date.now();
        const module: JobNS.Module = {
            id: JobNS.Generator.NewJobId(),
            job_id: params.job_id,
            name: params.name,
            status: JobNS.Status.Waiting,
            progress: 0,
            deadline: params.deadline,
            ctime: now,
            mtime: now,
        };
        await this.dal.CreateModule(module);
        return module;
    }

    async UpdateModule(id: string, params: JobNS.UpdateModuleParams) {
        const module = await this.GetModule(id);
        const doc = { ...module, ...params }
        doc.mtime = Date.now();
        await this.dal.UpdateModule(doc);
        return doc;
    }

    async DeleteModule(id: string) {
        const doc = await this.GetModule(id);
        doc.dtime = Date.now();
        await this.dal.UpdateModule(doc);
        return doc;
    }

    async UserJob(job_id: string, user_id: string): Promise<JobNS.UserJob> {
        const job = await this.GetJob(job_id)
        const now = Date.now();
        const params: JobNS.UserJob = {
            id: JobNS.Generator.NewUserModuleId(),
            user_id,
            job_id,
            status: 1,
            ctime: now,
            mtime: now
        }
        await this.dal.UserJob(params);
        return params;
    }

    async UserModule(module_id: string, user_id: string): Promise<JobNS.UserModule> {
        const module = await this.GetModule(module_id)
        const now = Date.now();
        const params: JobNS.UserModule = {
            id: JobNS.Generator.NewUserModuleId(),
            user_id,
            module_id,
            job_id: module.job_id,
            status: 1,
            ctime: now,
            mtime: now
        }
        await this.dal.UserModule(params);
        return params;
    }

    async ListUserJob(query: JobNS.QueryUserJob): Promise<JobNS.UserJob[]> {
        const user_job = await this.dal.ListUserJob(query);
        return user_job
    }

    async ListUserModule(query: JobNS.QueryUserModule): Promise<JobNS.UserModule[]> {
        const user_module = await this.dal.ListUserModule(query);
        return user_module
    }

    async GetViewJob(id: string) {
        const job = await this.GetJob(id);
        const [ module_job ,user_job, user_module ] = await Promise.all([
            this.ListModule({ job_id: id}),
            this.dal.ListUserJob({ job_id: id }),
            this.dal.ListUserModule({ job_id: id })
        ])    
        const users = await Promise.all(user_job.map(u => {
            return this.UserDAL.GetUser(u.user_id);
        }))
        const modules = await Promise.all(module_job.map(async m => {
            const users = await Promise.all(user_module.map(async u => {
                if(m.id === u.module_id) {
                    const user = await this.UserDAL.GetUser(u.user_id);
                    return user
                }
            }));
            const result = users.filter(u => u);
            return {...m, users: result}
        }))
        return {...job, users, modules} 
    }

    async GetViewUser(id: string) {
        const user = await this.UserBLL.GetUser(id);
        const [ user_job, user_module ] = await Promise.all([
            this.dal.ListUserJob({ user_id: id }),
            this.dal.ListUserModule({ user_id: id })
        ])    
        const jobs = await Promise.all(user_job.map(u => {
            return this.GetJob(u.job_id);
        }))
        const modules = await Promise.all(user_module.map(u => {
            return this.GetModule(u.module_id);
        }))

        return {...user, jobs, modules}  
    }

    async UploadFile(params: JobNS.UploadFileParams): Promise<void> {
        return this.dal.UploadFile(params)
    }

    async ListUpload(query: JobNS.QueryUpload): Promise<JobNS.UploadFileParams[]> {
        const list_file = await this.dal.ListUpload(query)
        const docs = await Promise.all(list_file.map(async l => {
            const user = await this.UserDAL.GetUser(l.user_id);
            const module = await this.dal.GetModule(l.module_id);
            return {...l, user, module}
        }))
        return docs
    }
}
