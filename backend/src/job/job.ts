import rand from "../lib/rand";
import { UserNS } from "../user/user";
export namespace JobNS {
    export enum Status {
        Waiting = "waiting",
        New = "new",
        Running = "running",
        Pause = "pause",
        Cancel = "cancel",
        Done = "done"
    }

    export interface Job {
        id : string;
        name : string;
        status: Status;
        progress : number;
        deadline: string;
        note?: any;
        ctime : number;
        mtime : number;
        dtime? : number;
    }

    export interface Module {
        id : string;
        job_id: string;
        name : string;
        status: Status;
        progress : number;
        deadline: string;
        note?: any;
        users?: any;
        ctime : number;
        mtime : number;
        dtime? : number;
    }

    export interface UserJob {
        id: string;
        user_id: string;
        job_id: string;
        status: number;
        ctime: number;
        mtime: number;
        dtime?: number;
    }

    export interface UserModule {
        id: string;
        module_id: string;
        user_id: string;
        job_id: string;
        status: number;
        ctime: number;
        mtime: number;
        dtime?: number;
    }

    export interface CreateJobParams {
        name : string;
        deadline : string;
        note? : any;
    }

    export interface CreateModuleParams {
        name : string;
        deadline : string;
        note? : any;
        job_id: string;
    }

    export interface UpdateJobParams {
        name?: string;
        status?: Status;
        deadline?: string;
        progress?: number;
        note?: any;
    }

    export interface UpdateModuleParams {
        name?: string;
        status?: Status;
        deadline?: string;
        progress?: number;
        note?: any;
    }

    export interface ViewJob extends Job {
        users: UserNS.User[]  // array user
    }
    export interface ViewUser extends UserNS.User {
        jobs: Job[]
    }

    export interface Query {
        status?: Status;
        job_id?: string;
    }

    export interface QueryUserJob {
        job_id?: string;
        user_id?: string;
    }

    export interface QueryUserModule extends QueryUserJob {
        module_id?: string;
    }

    export interface UploadFileParams {
        user_id: string;
        module_id: string;
        file_name: string;
        ctime: number;
    }

    export interface QueryUpload {
        user_id?: string;
        module_id?: string;
        file_name?: string;
    }

    export interface BLL {
        GetJob(id: string): Promise<Job>;
        ListJob(): Promise<Job[]>;
        CreateJob(params: CreateJobParams): Promise<Job>;
        UpdateJob(id: string, params: UpdateJobParams): Promise<Job>;
        DeleteJob(id : string): Promise<Job>;

        GetViewJob(id: string): Promise<ViewJob>;
        GetViewUser(id: string): Promise<ViewUser>;

        GetModule(id: string): Promise<Module>;
        ListModule(query: Query): Promise<Module[]>;
        CreateModule(params: CreateModuleParams): Promise<Module>;
        UpdateModule(id: string, params: UpdateModuleParams): Promise<Module>;
        DeleteModule(id : string): Promise<Module>;

        UserJob(job_id: string, user_id: string): Promise<UserJob>;
        UserModule(module_id: string, user_id: string): Promise<UserModule>;
        ListUserJob(query: QueryUserJob): Promise<UserJob[]>;
        ListUserModule(query: QueryUserModule): Promise<UserModule[]>;

        UploadFile(params: UploadFileParams): Promise<void>;
        ListUpload(query: QueryUpload): Promise<UploadFileParams[]>
    }

    export interface DAL {
        GetJob(id: string): Promise<Job>;
        ListJob(): Promise<Job[]>;
        CreateJob(job: Job): Promise<void>;
        UpdateJob(job: Job): Promise<void>;

        GetModule(id: string): Promise<Module>;
        ListModule(query: Query): Promise<Module[]>;
        CreateModule(job: Module): Promise<void>;
        UpdateModule(job: Module): Promise<void>;

        UserJob(params: UserJob): Promise<void>;
        UserModule(params: UserModule): Promise<void>;
        ListUserJob(query: QueryUserJob): Promise<UserJob[]>;
        ListUserModule(query: QueryUserModule): Promise<UserModule[]>;

        UploadFile(params: UploadFileParams): Promise<void>;
        ListUpload(query: QueryUpload): Promise<UploadFileParams[]>
    }

    export const Errors = {
        JobNotFound: new Error("Job not found"),
        ModuleNotFound: new Error("Module not found")
    }

    export const Generator = {
        NewJobId: () => rand.uppercase(8),
        NewModuleId: () => rand.uppercase(8),
        NewUserModuleId: () => rand.alphabet(8)
    }
}