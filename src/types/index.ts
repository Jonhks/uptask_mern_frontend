import { z } from "zod";

// ? Users

export type User = z.infer<typeof userSchema>;

const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  passConfirmation: z.string(),
  token: z.string(),
});

export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });

// ?  Projects
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ _id: true })),
});

export const dasboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    clientName: true,
    projectName: true,
    description: true,
    manager: true,
  })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  "projectName" | "clientName" | "description"
>;

//? Tasks

export const TaskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: TaskStatusSchema,
  completeBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: TaskStatusSchema,
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;

// ? Auth Users

type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegisterForm = Pick<
  Auth,
  "name" | "email" | "password" | "passConfirmation"
>;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "passConfirmation">;

export type ConfirmToken = Pick<Auth, "token">;

// ? Team

export const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true,
});

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;

export const TeamMembersSchema = z.array(teamMemberSchema);
