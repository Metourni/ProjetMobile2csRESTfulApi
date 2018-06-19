# Projet Mobile 2CS RESTful Api

## Get Statred
1- Install dependencies using ````$ npm install```` <br>
2- Configure your db in ```.env```<br>
3- Create your db using the cmd ```` npm run CreateDB````<br> 
4- Create your tables using the cmd ```` npm run Migrate````<br> 
5- Start the server using ```npm run start```<br>
6- If you want to start the server using dev mod with watching use ```npm run watch```



## Fix mysql-model Error
 - Delete the folder ```/node_module/mysql-model/node_module/mysql```
 - Go to the file ```/node_module/mysql-model/mysql-model.js```
 - In line 7 replace the code with : ````var connection = mysql.createPool(options);````
 
## TODO 
    - Validation.
    - Role Middeleware
    - Has authority
