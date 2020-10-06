## The module-alias do not work with typeorm (prod mode) for some reason and i don't know why and how to resolve it.
## I had to move the entire configuration of the ormconfig.js for the connection.ts because the TS didn't compile the file (i don't know how to resolve it).
## The command "yarn start:dev" works but when some request is made a error occurs. Probably the reason is the path for the entities... I don't know how to resolve it.
## In the employee.test.ts on duplicate test should be returning 409 however i don't know how to do this with typeorm.
## On index.ts in the src\controllers\index.ts the this scope is "strange" this makes me call super on EmployeeController... How to resolve it?