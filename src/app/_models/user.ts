import { Role } from "./role";
// The exclamation point (!) modifier on most of the properties is the
//TypeScript definite assignment assertion modifier,
//it tells the TypeScript compiler that these properties are initialized outside of the class (e.g. in the getAll() and getById() methods of the user service). The definite assignment assertion operator prevents errors from the TypeScript compiler when strict property initialization is enabled in the tsconfig.json file with "strict": true or "strictPropertyInitialization": true.

export class User{
  id!:string;
  title!:string;
  firstName!:string;
  lastName!:string;
  email!:string;
  role!:Role;
  isDeleting:boolean=false;
}
