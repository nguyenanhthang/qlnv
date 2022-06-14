import express from "express";
import cors from "cors";
import "./ext/log";
import "./lib/express";
import { ReadConfig } from "./config";
import { MongoCommon } from "./lib/mongodb";

import { HttpErrorHandler } from "./ext/http_error_handler";
import { UserDALMongo } from "./user/user.dal";
import { UserBLLBase } from "./user/user.bll";
import { NewUserAPI } from "./user/user.api";

import { UserAuthDALMongo } from "./auth/auth.dal.mongo";
import { UserAuthBLLBase } from "./auth/auth.bll.base";
import { NewAuthAPI } from "./auth/auth.api";

import { JobDALMongo } from "./job/job.dal";
import { JobBLLBase } from "./job/job.bll";
import { NewJobAPI } from "./job/job.api";

async function main() {
    const config = await ReadConfig();
    console.log(config);
    const client = await MongoCommon.Connect(config.database.db_url, { replica: true });
    console.log('connected to database');
    const database = client.db(config.database.db_name);
    //*********************************************************************//

    const userDAL = new UserDALMongo(database);
    await userDAL.init();
    const userBLL = new UserBLLBase(userDAL);
    await userBLL.init();

    const jobDAL = new JobDALMongo(database);
    await jobDAL.init();
    const jobBLL = new JobBLLBase(jobDAL, userBLL, userDAL);
    await jobBLL.init();


    
    const authDAL = new UserAuthDALMongo(database);
    await authDAL.init();
    const authBLL = new UserAuthBLLBase(authDAL, userBLL);
    await authBLL.init();


    //*********************************************************************//
    const app = express();
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(cors());
    app.use("/api/user/", NewUserAPI(userBLL));
    app.use("/api/auth/", NewAuthAPI(authBLL));
    app.use("/api/job/", NewJobAPI(jobBLL));
    //********************************************************************//
    app.use(HttpErrorHandler);
    // app.use(ExpressStaticFallback(config.app.dir));
    console.log(`Listen on ${config.server.port}`);
    app.listen(config.server.port, "0.0.0.0", () => {
        const err = arguments[0];
        if (err) {
            console.log(err);
        }
    })
}
main().catch(err => console.log(err));
