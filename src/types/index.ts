import { z } from "zod";

// ? Users

export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, "name" | "email">;

const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  currentPassword: z.string(),
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

//? Notes

export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;

//? Tasks

export const TaskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
export type taskProject = z.infer<typeof taskProjectSchema>;

// ?  Projects

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
  notes: z.array(
    noteSchema.extend({
      createBy: userSchema,
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskProjectSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true,
});

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ _id: true })),
  tasks: z.array(taskProjectSchema),
  team: z.array(z.string(userSchema.pick({ _id: true }))),
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
export const editProjectShcema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
});

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
export type updateCurrentUserPasswordForm = Pick<
  Auth,
  "currentPassword" | "password" | "passConfirmation"
>;
export type checkPasswordForm = Pick<Auth, "password">;

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
