import { FromMongoData, MongoDB, ToMongoData, MongoErrorCodes, } from "../lib/mongodb";
import { JobNS } from "./job";

export class JobDALMongo implements JobNS.DAL {
  constructor(private db: MongoDB) { }

  async init() { }

  private col_job = this.db.collection("job");
  private col_module = this.db.collection("module");
  private col_user_job = this.db.collection("user_job");
  private col_user_module = this.db.collection("user_module");
  private col_user_module_file = this.db.collection("user_module_file");

  async ListJob() {
    const docs = await this.col_job.find().toArray();
    return FromMongoData.Many<JobNS.Job>(docs);
  }

  async GetJob(id: string) {
    const doc = await this.col_job.findOne({ _id: id });
    return FromMongoData.One<JobNS.Job>(doc);
  }

  async CreateJob(job: JobNS.Job) {
    const doc = ToMongoData.One(job);
    await this.col_job.insertOne(doc);
  }

  async UpdateJob(job: JobNS.Job) {
    const doc = ToMongoData.One(job);
    await this.col_job.updateOne({ _id: job.id }, { $set: doc });
  }

  async ListModule(query: JobNS.Query) {
    const filter = {} as any;
    if (query.status) filter.status = query.status;
    if (query.job_id) filter.job_id = query.job_id;
    const docs = await this.col_module.find(filter).toArray();
    return FromMongoData.Many<JobNS.Module>(docs);
  }

  async GetModule(id: string) {
    const doc = await this.col_module.findOne({ _id: id });
    return FromMongoData.One<JobNS.Module>(doc);
  }

  async CreateModule(module: JobNS.Module) {
    const doc = ToMongoData.One(module);
    await this.col_module.insertOne(doc);
  }

  async UpdateModule(module: JobNS.Module) {
    const doc = ToMongoData.One(module);
    await this.col_module.updateOne({ _id: module.id }, { $set: doc });
  }

  async ListUserJob(query: JobNS.QueryUserJob) {
    const filter = {} as any;
    if (query.user_id) filter.user_id = query.user_id;
    if (query.job_id) filter.job_id = query.job_id;
    const docs = await this.col_user_job.find(filter).toArray();
    return FromMongoData.Many<JobNS.UserJob>(docs);
  }

  async ListUserModule(query: JobNS.QueryUserModule): Promise<JobNS.UserModule[]> {
    const filter = {} as any;
    if (query.user_id) filter.user_id = query.user_id;
    if (query.job_id) filter.job_id = query.job_id;
    if (query.module_id) filter.module_id = query.module_id;
    const docs = await this.col_user_module.find(filter).toArray();
    return FromMongoData.Many<JobNS.UserModule>(docs);
  }

  async UserJob(params: JobNS.UserJob) {
    const doc = ToMongoData.One(params);
    await this.col_user_job.insertOne(doc);
  }

  async UserModule(params: JobNS.UserModule) {
    const doc = ToMongoData.One(params);
    await this.col_user_module.insertOne(doc);
  }

  async UploadFile(params: JobNS.UploadFileParams): Promise<void> {
    const doc = ToMongoData.One(params);
    await this.col_user_module_file.insertOne(doc);
  }

  async ListUpload(query: JobNS.QueryUpload): Promise<JobNS.UploadFileParams[]> {
    let filter = {} as any;
    if(query.user_id) filter.user_id = query.user_id
    if(query.module_id) filter.module_id = query.module_id
    const docs = await this.col_user_module_file.find(filter).toArray();
    return FromMongoData.Many<JobNS.UploadFileParams>(docs);
  }
}
