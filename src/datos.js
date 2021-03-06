exports.Datos = {
    "herramientas":[
       {
          "nombre":"Amasadora",
          "consumo":"10",
          "unidad":"watt/hs",
          "id":"f473d721-7747-4afb-bb00-12eb1deec268"
       },
       {
          "nombre":"Horno",
          "consumo":"5",
          "unidad":"cm3/hs",
          "id":"9639a51c-4aae-41b7-951d-83274b42c560"
       },
       {
          "nombre":"Heladera",
          "consumo":"20",
          "unidad":"watt/hs",
          "id":"a66d6fec-e813-4137-b560-4b4f74d5b91f"
       },
       {
          "nombre":"Balanza",
          "consumo":"1",
          "unidad":"watt/hs",
          "id":"50c32485-9539-48c7-b8af-112199f25a9c"
       }
    ],
    "materia_prima":[
       {
          "nombre":"Harina",
          "variaciones":[
             {
                "marca":"pureza",
                "precio":"70",
                "cantidad":"1000",
                "medida":"grs"
             },
             {
                "marca":"morixe",
                "precio":"49",
                "cantidad":"1000",
                "medida":"grs"
             },
             {
                "marca":"sel sol",
                "precio":"210",
                "cantidad":"1000",
                "medida":"grs"
             },
             {
                "marca":"Molinos Cañuelas",
                "precio":"860",
                "cantidad":"25000",
                "medida":"grs"
             },
             {
                "marca":"stagioni",
                "precio":"545",
                "cantidad":"1000",
                "medida":"grs"
             }
          ],
          "id":"d0df7e4b-e43f-464a-a6e7-dc815dae6c56"
       },
       {
          "nombre":"Levadura",
          "variaciones":[
             {
                "marca":"levex",
                "precio":"55",
                "cantidad":"10",
                "medida":"grs"
             },
             {
                "marca":"safale",
                "precio":"355",
                "cantidad":"10",
                "medida":"grs"
             },
             {
                "marca":"calsa nutrileva",
                "precio":"638",
                "cantidad":"500",
                "medida":"grs"
             },
             {
                "marca":"calsa virgen",
                "precio":"125",
                "cantidad":"500",
                "medida":"grs"
             }
          ],
          "id":"6c4f7cdf-31e2-4459-9082-60500b2d4f7a"
       },
       {
          "nombre":"Agua",
          "variaciones":[
             {
                "marca":"Glaciar",
                "precio":"280",
                "cantidad":"12000",
                "medida":"mls"
             },
             {
                "marca":"kin",
                "precio":"404",
                "cantidad":"6000",
                "medida":"mls"
             },
             {
                "marca":"cellier",
                "precio":"30",
                "cantidad":"2000",
                "medida":"mls"
             },
             {
                "marca":"sierra de los padres",
                "precio":"330",
                "cantidad":"12000",
                "medida":"mls"
             }
          ],
          "id":"7f539468-9fe9-4d0e-9470-eb1b5e361f07"
       },
       {
          "nombre":"Aceite de Girasol",
          "variaciones":[
             {
                "marca":"Natura",
                "precio":"900",
                "cantidad":"3000",
                "medida":"mls"
             },
             {
                "marca":"Natura",
                "precio":"420",
                "cantidad":"1500",
                "medida":"mls"
             },
             {
                "marca":"Granix",
                "precio":"250",
                "cantidad":"750",
                "medida":"mls"
             },
             {
                "marca":"cocinero",
                "precio":"300",
                "cantidad":"1500",
                "medida":"mls"
             },
             {
                "marca":"tratorio",
                "precio":"442",
                "cantidad":"2000",
                "medida":"mls"
             }
          ],
          "id":"99843840-120b-4a0c-a90d-8b22055f0442"
       },
       {
          "nombre":"Sal",
          "variaciones":[
             {
                "marca":"celusal",
                "precio":"42",
                "cantidad":"500",
                "medida":"grs"
             },
             {
                "marca":"dos estrellas",
                "precio":"40",
                "cantidad":"1000",
                "medida":"grs"
             },
             {
                "marca":"macrozen",
                "precio":"175",
                "cantidad":"500",
                "medida":"grs"
             }
          ],
          "id":"5daddd17-be78-4bb7-9274-22a8c0a1a17e"
       },
       {
          "nombre":"Pure de Tomate",
          "variaciones":[
             {
                "marca":"de la huerta",
                "precio":"43",
                "cantidad":"210",
                "medida":"grs"
             },
             {
                "marca":"oinca",
                "precio":"83",
                "cantidad":"150",
                "medida":"grs"
             },
             {
                "marca":"molto",
                "precio":"67",
                "cantidad":"520",
                "medida":"grs"
             },
             {
                "marca":"arcor",
                "precio":"75",
                "cantidad":"520",
                "medida":"grs"
             }
          ],
          "id":"b930421a-415e-41a5-a228-7249d658b972"
       },
       {
          "nombre":"Mozzarella",
          "variaciones":[
             {
                "marca":"Vacalin",
                "precio":"1100",
                "cantidad":"2000",
                "medida":"grs"
             },
             {
                "marca":"vidal",
                "precio":"574",
                "cantidad":"1000",
                "medida":"grs"
             },
             {
                "marca":"lac",
                "precio":"400",
                "cantidad":"1000",
                "medida":"grs"
             }
          ],
          "id":"571041c0-4437-4c86-baf6-efaa96d071e5"
       }
    ],
    "recetas":[
       {
          "nombre":"Pre Pizza",
          "rendimiento":"1",
          "pasos":[
             {
                "nombre":"Pesar Ingredientes",
                "descripcion":"se pesan cada uno de los ingredientes.",
                "tiempo":"10:00",
                "tiempoTrabajo":"10:00",
                "ingredientes":[
                   {
                      "ingrediente":{
                         "nombre":"Harina",
                         "variaciones":[
                            {
                               "marca":"pureza",
                               "precio":"70",
                               "cantidad":"1000",
                               "medida":"grs"
                            },
                            {
                               "marca":"morixe",
                               "precio":"49",
                               "cantidad":"1000",
                               "medida":"grs"
                            },
                            {
                               "marca":"sel sol",
                               "precio":"210",
                               "cantidad":"1000",
                               "medida":"grs"
                            },
                            {
                               "marca":"Molinos Cañuelas",
                               "precio":"860",
                               "cantidad":"25000",
                               "medida":"grs"
                            },
                            {
                               "marca":"stagioni",
                               "precio":"545",
                               "cantidad":"1000",
                               "medida":"grs"
                            }
                         ],
                         "id":"d0df7e4b-e43f-464a-a6e7-dc815dae6c56"
                      },
                      "cantidad":"175",
                      "unidad":"grs"
                   },
                   {
                      "ingrediente":{
                         "nombre":"Levadura",
                         "variaciones":[
                            {
                               "marca":"levex",
                               "precio":"55",
                               "cantidad":"10",
                               "medida":"grs"
                            },
                            {
                               "marca":"safale",
                               "precio":"355",
                               "cantidad":"10",
                               "medida":"grs"
                            },
                            {
                               "marca":"calsa nutrileva",
                               "precio":"638",
                               "cantidad":"500",
                               "medida":"grs"
                            },
                            {
                               "marca":"calsa virgen",
                               "precio":"125",
                               "cantidad":"500",
                               "medida":"grs"
                            }
                         ],
                         "id":"6c4f7cdf-31e2-4459-9082-60500b2d4f7a"
                      },
                      "cantidad":"7.5",
                      "unidad":"grs"
                   },
                   {
                      "ingrediente":{
                         "nombre":"Agua",
                         "variaciones":[
                            {
                               "marca":"Glaciar",
                               "precio":"280",
                               "cantidad":"12000",
                               "medida":"mls"
                            },
                            {
                               "marca":"kin",
                               "precio":"404",
                               "cantidad":"6000",
                               "medida":"mls"
                            },
                            {
                               "marca":"cellier",
                               "precio":"30",
                               "cantidad":"2000",
                               "medida":"mls"
                            },
                            {
                               "marca":"sierra de los padres",
                               "precio":"330",
                               "cantidad":"12000",
                               "medida":"mls"
                            }
                         ],
                         "id":"7f539468-9fe9-4d0e-9470-eb1b5e361f07"
                      },
                      "cantidad":"100",
                      "unidad":"mls"
                   },
                   {
                      "ingrediente":{
                         "nombre":"Aceite de Girasol",
                         "variaciones":[
                            {
                               "marca":"Natura",
                               "precio":"900",
                               "cantidad":"3000",
                               "medida":"mls"
                            },
                            {
                               "marca":"Natura",
                               "precio":"420",
                               "cantidad":"1500",
                               "medida":"mls"
                            },
                            {
                               "marca":"Granix",
                               "precio":"250",
                               "cantidad":"750",
                               "medida":"mls"
                            },
                            {
                               "marca":"cocinero",
                               "precio":"300",
                               "cantidad":"1500",
                               "medida":"mls"
                            },
                            {
                               "marca":"tratorio",
                               "precio":"442",
                               "cantidad":"2000",
                               "medida":"mls"
                            }
                         ],
                         "id":"99843840-120b-4a0c-a90d-8b22055f0442"
                      },
                      "cantidad":"20",
                      "unidad":"mls"
                   },
                   {
                      "ingrediente":{
                         "nombre":"Sal",
                         "variaciones":[
                            {
                               "marca":"celusal",
                               "precio":"42",
                               "cantidad":"500",
                               "medida":"grs"
                            },
                            {
                               "marca":"dos estrellas",
                               "precio":"40",
                               "cantidad":"1000",
                               "medida":"grs"
                            },
                            {
                               "marca":"macrozen",
                               "precio":"175",
                               "cantidad":"500",
                               "medida":"grs"
                            }
                         ],
                         "id":"5daddd17-be78-4bb7-9274-22a8c0a1a17e"
                      },
                      "cantidad":"10",
                      "unidad":"grs"
                   }
                ],
                "herramientas":[
                   {
                      "herramienta":{
                         "nombre":"Balanza",
                         "consumo":"1",
                         "unidad":"watt/hs",
                         "id":"50c32485-9539-48c7-b8af-112199f25a9c"
                      },
                      "tiempo":"10:00"
                   }
                ]
             },
             {
                "nombre":"Amasar Ingredientes",
                "tiempoTrabajo":"00:00",
                "tiempo":"10:00",
                "descripcion":"colocar los ingredientes en la amasadora durante y amasar",
                "herramientas":[
                   {
                      "herramienta":{
                         "nombre":"Amasadora",
                         "consumo":"10",
                         "unidad":"watt/hs",
                         "id":"f473d721-7747-4afb-bb00-12eb1deec268"
                      },
                      "tiempo":"10:00"
                   }
                ]
             },
             {
                "nombre":"Armar Bollo",
                "descripcion":"sacar masa de la amasadora y bollar hasta que quede una masa lisa",
                "tiempo":"05:00",
                "tiempoTrabajo":"05:00"
             },
             {
                "nombre":"Dejar reposar",
                "descripcion":"dejar reposar el bolllo tapado a temperatura hambiente",
                "tiempo":"20:00",
                "tiempoTrabajo":"00:00"
             },
             {
                "nombre":"Armar pizza",
                "descripcion":"estirar el bollo de pizza en la pizzera y dejar reposar",
                "tiempo":"10:00",
                "tiempoTrabajo":"05:00"
             },
             {
                "nombre":"Precocinar",
                "descripcion":"precocinar en el horno a 180 grados",
                "tiempo":"10:00",
                "tiempoTrabajo":"00:00",
                "herramientas":[
                   {
                      "herramienta":{
                         "nombre":"Horno",
                         "consumo":"5",
                         "unidad":"cm3/hs",
                         "id":"9639a51c-4aae-41b7-951d-83274b42c560"
                      },
                      "tiempo":"10:00"
                   }
                ]
             }
          ],
          "id":"331fa7d1-19eb-44d3-a161-bd7d29640a38"
       },
       {
          "nombre":"Pizza",
          "rendimiento":"1",
          "pasos":[
             {
                "nombre":"Armar Prepizza",
                "descripcion":"armar prepizza con receta de prepizza",
                "ingredientes":[
                   {
                      "ingrediente":{
                         "nombre":"Pre Pizza",
                         "rendimiento":"1",
                         "pasos":[
                            {
                               "nombre":"Pesar Ingredientes",
                               "descripcion":"se pesan cada uno de los ingredientes.",
                               "tiempo":"10:00",
                               "tiempoTrabajo":"10:00",
                               "ingredientes":[
                                  {
                                     "ingrediente":{
                                        "nombre":"Harina",
                                        "variaciones":[
                                           {
                                              "marca":"pureza",
                                              "precio":"70",
                                              "cantidad":"1000",
                                              "medida":"grs"
                                           },
                                           {
                                              "marca":"morixe",
                                              "precio":"49",
                                              "cantidad":"1000",
                                              "medida":"grs"
                                           },
                                           {
                                              "marca":"sel sol",
                                              "precio":"210",
                                              "cantidad":"1000",
                                              "medida":"grs"
                                           },
                                           {
                                              "marca":"Molinos Cañuelas",
                                              "precio":"860",
                                              "cantidad":"25000",
                                              "medida":"grs"
                                           },
                                           {
                                              "marca":"stagioni",
                                              "precio":"545",
                                              "cantidad":"1000",
                                              "medida":"grs"
                                           }
                                        ],
                                        "id":"d0df7e4b-e43f-464a-a6e7-dc815dae6c56"
                                     },
                                     "cantidad":"175",
                                     "unidad":"grs"
                                  },
                                  {
                                     "ingrediente":{
                                        "nombre":"Levadura",
                                        "variaciones":[
                                           {
                                              "marca":"levex",
                                              "precio":"55",
                                              "cantidad":"10",
                                              "medida":"grs"
                                           },
                                           {
                                              "marca":"safale",
                                              "precio":"355",
                                              "cantidad":"10",
                                              "medida":"grs"
                                           },
                                           {
                                              "marca":"calsa nutrileva",
                                              "precio":"638",
                                              "cantidad":"500",
                                              "medida":"grs"
                                           },
                                           {
                                              "marca":"calsa virgen",
                                              "precio":"125",
                                              "cantidad":"500",
                                              "medida":"grs"
                                           }
                                        ],
                                        "id":"6c4f7cdf-31e2-4459-9082-60500b2d4f7a"
                                     },
                                     "cantidad":"7.5",
                                     "unidad":"grs"
                                  },
                                  {
                                     "ingrediente":{
                                        "nombre":"Agua",
                                        "variaciones":[
                                           {
                                              "marca":"Glaciar",
                                              "precio":"280",
                                              "cantidad":"12000",
                                              "medida":"mls"
                                           },
                                           {
                                              "marca":"kin",
                                              "precio":"404",
                                              "cantidad":"6000",
                                              "medida":"mls"
                                           },
                                           {
                                              "marca":"cellier",
                                              "precio":"30",
                                              "cantidad":"2000",
                                              "medida":"mls"
                                           },
                                           {
                                              "marca":"sierra de los padres",
                                              "precio":"330",
                                              "cantidad":"12000",
                                              "medida":"mls"
                                           }
                                        ],
                                        "id":"7f539468-9fe9-4d0e-9470-eb1b5e361f07"
                                     },
                                     "cantidad":"100",
                                     "unidad":"mls"
                                  },
                                  {
                                     "ingrediente":{
                                        "nombre":"Aceite de Girasol",
                                        "variaciones":[
                                           {
                                              "marca":"Natura",
                                              "precio":"900",
                                              "cantidad":"3000",
                                              "medida":"mls"
                                           },
                                           {
                                              "marca":"Natura",
                                              "precio":"420",
                                              "cantidad":"1500",
                                              "medida":"mls"
                                           },
                                           {
                                              "marca":"Granix",
                                              "precio":"250",
                                              "cantidad":"750",
                                              "medida":"mls"
                                           },
                                           {
                                              "marca":"cocinero",
                                              "precio":"300",
                                              "cantidad":"1500",
                                              "medida":"mls"
                                           },
                                           {
                                              "marca":"tratorio",
                                              "precio":"442",
                                              "cantidad":"2000",
                                              "medida":"mls"
                                           }
                                        ],
                                        "id":"99843840-120b-4a0c-a90d-8b22055f0442"
                                     },
                                     "cantidad":"20",
                                     "unidad":"mls"
                                  },
                                  {
                                     "ingrediente":{
                                        "nombre":"Sal",
                                        "variaciones":[
                                           {
                                              "marca":"celusal",
                                              "precio":"42",
                                              "cantidad":"500",
                                              "medida":"grs"
                                           },
                                           {
                                              "marca":"dos estrellas",
                                              "precio":"40",
                                              "cantidad":"1000",
                                              "medida":"grs"
                                           },
                                           {
                                              "marca":"macrozen",
                                              "precio":"175",
                                              "cantidad":"500",
                                              "medida":"grs"
                                           }
                                        ],
                                        "id":"5daddd17-be78-4bb7-9274-22a8c0a1a17e"
                                     },
                                     "cantidad":"10",
                                     "unidad":"grs"
                                  }
                               ],
                               "herramientas":[
                                  {
                                     "herramienta":{
                                        "nombre":"Balanza",
                                        "consumo":"1",
                                        "unidad":"watt/hs",
                                        "id":"50c32485-9539-48c7-b8af-112199f25a9c"
                                     },
                                     "tiempo":"10:00"
                                  }
                               ]
                            },
                            {
                               "nombre":"Amasar Ingredientes",
                               "tiempoTrabajo":"00:00",
                               "tiempo":"10:00",
                               "descripcion":"colocar los ingredientes en la amasadora durante y amasar",
                               "herramientas":[
                                  {
                                     "herramienta":{
                                        "nombre":"Amasadora",
                                        "consumo":"10",
                                        "unidad":"watt/hs",
                                        "id":"f473d721-7747-4afb-bb00-12eb1deec268"
                                     },
                                     "tiempo":"10:00"
                                  }
                               ]
                            },
                            {
                               "nombre":"Armar Bollo",
                               "descripcion":"sacar masa de la amasadora y bollar hasta que quede una masa lisa",
                               "tiempo":"05:00",
                               "tiempoTrabajo":"05:00"
                            },
                            {
                               "nombre":"Dejar reposar",
                               "descripcion":"dejar reposar el bolllo tapado a temperatura hambiente",
                               "tiempo":"20:00",
                               "tiempoTrabajo":"00:00"
                            },
                            {
                               "nombre":"Armar pizza",
                               "descripcion":"estirar el bollo de pizza en la pizzera y dejar reposar",
                               "tiempo":"10:00",
                               "tiempoTrabajo":"05:00"
                            },
                            {
                               "nombre":"Precocinar",
                               "descripcion":"precocinar en el horno a 180 grados",
                               "tiempo":"10:00",
                               "tiempoTrabajo":"00:00",
                               "herramientas":[
                                  {
                                     "herramienta":{
                                        "nombre":"Horno",
                                        "consumo":"5",
                                        "unidad":"cm3/hs",
                                        "id":"9639a51c-4aae-41b7-951d-83274b42c560"
                                     },
                                     "tiempo":"10:00"
                                  }
                               ]
                            }
                         ],
                         "id":"331fa7d1-19eb-44d3-a161-bd7d29640a38"
                      },
                      "cantidad":"1"
                   }
                ]
             },
             {
                "nombre":"Agregar Tomate",
                "descripcion":"agregar salsa de tomate en la parte superior",
                "tiempo":"02:00",
                "tiempoTrabajo":"02:00",
                "ingredientes":[
                   {
                      "ingrediente":{
                         "nombre":"Pure de Tomate",
                         "variaciones":[
                            {
                               "marca":"de la huerta",
                               "precio":"43",
                               "cantidad":"210",
                               "medida":"grs"
                            },
                            {
                               "marca":"oinca",
                               "precio":"83",
                               "cantidad":"150",
                               "medida":"grs"
                            },
                            {
                               "marca":"molto",
                               "precio":"67",
                               "cantidad":"520",
                               "medida":"grs"
                            },
                            {
                               "marca":"arcor",
                               "precio":"75",
                               "cantidad":"520",
                               "medida":"grs"
                            }
                         ],
                         "id":"b930421a-415e-41a5-a228-7249d658b972"
                      },
                      "cantidad":"75",
                      "unidad":"grs"
                   }
                ]
             },
             {
                "nombre":"Tostar tomate",
                "descripcion":"cocinar al horano el tomate para secarlo",
                "tiempo":"05:00",
                "tiempoTrabajo":"00:00",
                "herramientas":[
                   {
                      "herramienta":{
                         "nombre":"Horno",
                         "consumo":"5",
                         "unidad":"cm3/hs",
                         "id":"9639a51c-4aae-41b7-951d-83274b42c560"
                      },
                      "tiempo":"05:00"
                   }
                ]
             },
             {
                "nombre":"Agregar Mozzarella",
                "descripcion":"cortar en trozo la mozzarella y agregarla arriba",
                "tiempo":"05:00",
                "tiempoTrabajo":"05:00",
                "ingredientes":[
                   {
                      "ingrediente":{
                         "nombre":"Mozzarella",
                         "variaciones":[
                            {
                               "marca":"Vacalin",
                               "precio":"1100",
                               "cantidad":"2000",
                               "medida":"grs"
                            },
                            {
                               "marca":"vidal",
                               "precio":"574",
                               "cantidad":"1000",
                               "medida":"grs"
                            },
                            {
                               "marca":"lac",
                               "precio":"400",
                               "cantidad":"1000",
                               "medida":"grs"
                            }
                         ],
                         "id":"571041c0-4437-4c86-baf6-efaa96d071e5"
                      },
                      "cantidad":"300",
                      "unidad":"grs"
                   }
                ]
             },
             {
                "nombre":"Derretir Mozzarella",
                "descripcion":"derretir la mozzarela en el horno",
                "tiempo":"05:00",
                "tiempoTrabajo":"00:00",
                "herramientas":[
                   {
                      "herramienta":{
                         "nombre":"Horno",
                         "consumo":"5",
                         "unidad":"cm3/hs",
                         "id":"9639a51c-4aae-41b7-951d-83274b42c560"
                      },
                      "tiempo":"05:00"
                   }
                ]
             }
          ],
          "id":"d93b4068-011a-4e80-a180-24a11be2403b"
       }
    ]
 }