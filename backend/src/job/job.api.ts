import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { JobNS } from "../job/job";
import * as fs from "fs/promises";
import * as path from 'path';

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

export function NewJobAPI(
    jobBLL: JobNS.BLL,
) {
    const router = express.Router();
    const STATUS = Object.values(JobNS.Status);

    router.get("/list", async (req, res) => {
        const docs = await jobBLL.ListJob();
        res.json(docs);
    });

    router.post("/user", async (req, res) => {
        const job_id = HttpParamValidators.MustBeString(req.body, "job_id", 8);
        const user_id = HttpParamValidators.MustBeString(req.body, "user_id", 8);
        const doc = await jobBLL.UserJob(job_id, user_id);
        res.json(doc);
    });

    router.get("/user/get", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 8);
        const doc = await jobBLL.GetViewUser(id);
        res.json(doc);
    });

    router.get("/user/list", async (req, res) => {
        const query: JobNS.QueryUserJob = {}
        if (req.query.user_id) query.user_id = HttpParamValidators.MustBeString(req.query, "user_id");
        if (req.query.job_id) query.job_id = HttpParamValidators.MustBeString(req.query, "job_id");
        const doc = await jobBLL.ListUserJob(query);
        res.json(doc);
    });

    router.get("/get", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 8);
        const doc = await jobBLL.GetViewJob(id);
        res.json(doc);

    });

    router.post("/create", async (req, res) => {
        const name = HttpParamValidators.MustBeString(req.body, "name", 2);
        const deadline = HttpParamValidators.MustBeString(req.body, "deadline", 2);
        const note = req.body.note;
        const params: JobNS.CreateJobParams = {
            name,
            deadline,
            note
        };
        const job = await jobBLL.CreateJob(params);
        res.json(job);
    });

    router.post("/update", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 8);
        const params: JobNS.UpdateJobParams = {};
        if (req.body.name) params.name = HttpParamValidators.MustBeString(req.body, 'name', 2);
        if (req.body.status) params.status = HttpParamValidators.MustBeOneOf(req.body, 'status', STATUS);
        if (req.body.deadline) params.deadline = HttpParamValidators.MustBeString(req.body, 'deadline', 2);
        if (req.body.progress) params.progress = req.body.progress;
        if (req.body.note) params.note = req.body.note;
        const doc = await jobBLL.UpdateJob(id, params);
        res.json(doc);
    });

    router.post("/delete", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 8);
        const doc = await jobBLL.DeleteJob(id);
        res.json(doc);
    });

    router.get("/module/list", async (req, res) => {
        let query: JobNS.Query = {};
        if (req.query.job_id) query.job_id = HttpParamValidators.MustBeString(req.query, 'job_id', 2)
        const docs = await jobBLL.ListModule(query);
        res.json(docs);
    });

    router.get("/module/get", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 8);
        const doc = await jobBLL.GetModule(id);
        res.json(doc);
    });

    router.post("/module/create", async (req, res) => {
        const name = HttpParamValidators.MustBeString(req.body, "name", 2);
        const deadline = HttpParamValidators.MustBeString(req.body, "deadline", 2);
        const job_id = HttpParamValidators.MustBeString(req.body, "job_id", 2);
        const note = req.body.note;
        const params: JobNS.CreateModuleParams = {
            name,
            job_id,
            deadline,
            note
        };
        const job = await jobBLL.CreateModule(params);
        res.json(job);
    });

    router.post("/module/update", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 8);
        const params: JobNS.UpdateJobParams = {};
        if (req.body.name) params.name = HttpParamValidators.MustBeString(req.body, 'name', 2);
        if (req.body.status) params.status = HttpParamValidators.MustBeOneOf(req.body, 'status', STATUS);
        if (req.body.deadline) params.deadline = HttpParamValidators.MustBeString(req.body, 'deadline', 2);
        if (req.body.progress) params.progress = req.body.progress;
        if (req.body.note) params.note = req.body.note;
        const doc = await jobBLL.UpdateModule(id, params);
        res.json(doc);
    });

    router.post("/module/delete", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 8);
        const doc = await jobBLL.DeleteModule(id);
        res.json(doc);
    });

    router.post("/module/user", async (req, res) => {
        const module_id = HttpParamValidators.MustBeString(req.body, "module_id", 8);
        const user_id = HttpParamValidators.MustBeString(req.body, "user_id", 8);
        const doc = await jobBLL.UserModule(module_id, user_id);
        res.json(doc);
    });

    router.get("/upload/list", async (req, res) => {
        const query = {} as any;
        if (req.query.module_id) query.module_id = HttpParamValidators.MustBeString(req.query, "module_id", 8);
        if (req.query.user_id) query.user_id = HttpParamValidators.MustBeString(req.query, "user_id", 8);
        const doc = await jobBLL.ListUpload(query);
        res.json(doc);
    });

    router.post('/upload', upload.single('filedata'), async function (req: any, res) {
        console.log('file', req.file);
        
        const params: JobNS.UploadFileParams = {
            user_id: HttpParamValidators.MustBeString(req.body, 'user_id'),
            module_id: HttpParamValidators.MustBeString(req.body, 'module_id'),
            file_name: req.file.filename,
            ctime: Date.now()
        }  
        await jobBLL.UploadFile(params)
        res.json('1')
    });

    router.get("/download", async (req, res) => {
        const file_name = req.query.file
        const url = path.join(__dirname, '../../public/uploads/' + file_name);      
        const data = await fs.readFile(url);
        res.setHeader("Content-Type", 'application/msword');
        res.setHeader("Content-Disposition" , "attachment; filename=" + file_name);
        res.send(data);
    });

    return router;
}
