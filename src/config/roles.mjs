const allRoles = {
    superAdmin: ["getAdmins", "getUsers", "manageAdmins"],
    admin: ["getUsers" ],
    user: ["user" , "activateWarranty" ],
  };
  
  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));
  
  export { roles, roleRights };
  