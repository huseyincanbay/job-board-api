import { Job } from "../entities/Job";
import { User } from "../entities/User";
import { jobRepository } from "../repositories/JobRepository";
import { Request, Response, NextFunction } from "express";

export class JobService {
  static createJob = async (
    req: Request,
    data: {
      title: string;
      company: string;
      description: string;
      requirements: string;
      location: string;
      salary: number;
    }
  ): Promise<Job> => {
    try {
      const userId = req.locals.jwtPayload?.userId;

      if (userId === undefined) {
        throw new Error("User not authenticated");
      }

      const job = new Job();
      job.title = data.title;
      job.company = data.company;
      job.description = data.description;
      job.requirements = data.requirements;
      job.location = data.location;
      job.salary = data.salary;

      job.user = { id: userId } as User;

      if (data.salary < 0) {
        throw new Error("Salary must be a non-negative value");
      }

      const savedJob = await jobRepository.save(job);
      return savedJob;
    } catch (error) {
      throw error;
    }
  };
}
