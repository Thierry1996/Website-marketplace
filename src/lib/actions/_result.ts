/**
 * Standard server-action result shape. Every action returns one of these so
 * forms can branch on `success` and surface `error.fieldErrors` / `error.formError`.
 */

import type { ZodError, ZodIssue } from "zod";

export type ActionResult<T = void> =
  | { success: true;  data: T }
  | { success: false; error: { formError?: string; fieldErrors?: Record<string, string[]> } };

export function ok<T>(data: T): ActionResult<T> {
  return { success: true, data };
}

export function fail(formError: string): ActionResult<never> {
  return { success: false, error: { formError } };
}

export function failFromZod(err: ZodError): ActionResult<never> {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of err.issues as ZodIssue[]) {
    const key = issue.path.join(".") || "_form";
    (fieldErrors[key] ??= []).push(issue.message);
  }
  return { success: false, error: { fieldErrors, formError: "Please correct the errors below." } };
}
