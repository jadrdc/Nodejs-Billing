const mongoose=require("mongoose");

module.exports={
  port : process.env.PORT||8888,
  secret : "integracion",
  database: 'mongodb://root:root@ds019628.mlab.com:19628/bibliotecaunapec'
,mongoose
};
