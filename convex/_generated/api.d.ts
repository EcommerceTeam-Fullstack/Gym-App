/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as Inventory_CreatetInventory from "../Inventory/CreatetInventory.js";
import type * as Inventory_DeleteInventory from "../Inventory/DeleteInventory.js";
import type * as Inventory_FiltrationInventory from "../Inventory/FiltrationInventory.js";
import type * as Inventory_UpateInventory from "../Inventory/UpateInventory.js";
import type * as actions_users_login from "../actions/users/login.js";
import type * as admin_deleteTrainer from "../admin/deleteTrainer.js";
import type * as admin_promoteToTrainer from "../admin/promoteToTrainer.js";
import type * as classes_createClass from "../classes/createClass.js";
import type * as classes_deleteClass from "../classes/deleteClass.js";
import type * as classes_getAllClasses from "../classes/getAllClasses.js";
import type * as classes_getClassesByTrainer from "../classes/getClassesByTrainer.js";
import type * as classes_updateClass from "../classes/updateClass.js";
import type * as trainer_getMyProfile from "../trainer/getMyProfile.js";
import type * as users_changePassword from "../users/changePassword.js";
import type * as users_createUser from "../users/createUser.js";
import type * as users_deleteUser from "../users/deleteUser.js";
import type * as users_getAllUsers from "../users/getAllUsers.js";
import type * as users_getUserById from "../users/getUserById.js";
import type * as users_register from "../users/register.js";
import type * as users_searchUsers from "../users/searchUsers.js";
import type * as users_updateUser from "../users/updateUser.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "Inventory/CreatetInventory": typeof Inventory_CreatetInventory;
  "Inventory/DeleteInventory": typeof Inventory_DeleteInventory;
  "Inventory/FiltrationInventory": typeof Inventory_FiltrationInventory;
  "Inventory/UpateInventory": typeof Inventory_UpateInventory;
  "actions/users/login": typeof actions_users_login;
  "admin/deleteTrainer": typeof admin_deleteTrainer;
  "admin/promoteToTrainer": typeof admin_promoteToTrainer;
  "classes/createClass": typeof classes_createClass;
  "classes/deleteClass": typeof classes_deleteClass;
  "classes/getAllClasses": typeof classes_getAllClasses;
  "classes/getClassesByTrainer": typeof classes_getClassesByTrainer;
  "classes/updateClass": typeof classes_updateClass;
  "trainer/getMyProfile": typeof trainer_getMyProfile;
  "users/changePassword": typeof users_changePassword;
  "users/createUser": typeof users_createUser;
  "users/deleteUser": typeof users_deleteUser;
  "users/getAllUsers": typeof users_getAllUsers;
  "users/getUserById": typeof users_getUserById;
  "users/register": typeof users_register;
  "users/searchUsers": typeof users_searchUsers;
  "users/updateUser": typeof users_updateUser;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
