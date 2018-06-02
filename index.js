#!/usr/bin/env node
const colors = require('colors');
const cmd = require('commander');
const mongoose = require('mongoose');
const Pizza = require('./db/Pizza');

mongoose.connect('mongodb://localhost/pizza-cats-test')
  .then(instance => {
    const conn = instance.connections[0];
    console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error('\n === Did you remember to start `mongod`? === \n');
    console.error(err);
  });

cmd

  .command('order <flavour> <size>')
  .option('-c, --cash')
  .option('-d, --delivery')
  .action(function(flavour, size, opts){
    //console.log(flavour, size, opts);
    Pizza.create({
      flavour:flavour,
      size:size,
      cash: opts.cash,
      delivery: opts.delivery
    }).then(function(){
      console.log('Tu pizza ha sido guardada'.red.bold);
      mongoose.disconnect();
    });
  });


  cmd
  .command('list')
  .option('-dte, --date')
  .action(function(flavour, size, created){
    Pizza.find().then(pizzas => {
      for(var i=0; i <= pizzas.length-1; i++){
        var item = pizzas[i];
        console.log('Sabor: '.yellow.bold + `${item.flavour}`.green);
        console.log('Tamaño: '.yellow.bold + `${item.size}`.green);
        if(item.cash === true){console.log('Pago: '.yellow.bold + `EFECTIVO`.green);}
        if(item.delivery === true){console.log('Entrega: '.yellow.bold + `DOMICILIO`.green);}
        console.log('Fecha: '.yellow.bold + `${item.created}`.blue);
        console.log('\r\n');
      }
      mongoose.disconnect();
    });
  });


/*
cmd
  .command('list <size>')
  .option('-dte, --date')
  .action(function(flavour, size, created){
    Pizza.find({},$or,{size:'mediana'}).then(pizzas => {
      for(var i=0; i <= pizzas.length-1; i++){
        var item = pizzas[i];
        console.log('Sabor: '.yellow.bold + `${item.flavour}`.green);
        console.log('Tamaño: '.yellow.bold + `${item.size}`.green);
        if(item.cash === true){console.log('Pago: '.yellow.bold + `EFECTIVO`.green);}
        if(item.delivery === true){console.log('Entrega: '.yellow.bold + `DOMICILIO`.green);}
        console.log('Fecha: '.yellow.bold + `${item.created}`.blue);
        console.log('\r\n');
      }
      mongoose.disconnect();
    });
  });
  */

cmd.parse(process.argv);