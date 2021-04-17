import * as mongoose from 'mongoose';

class Categories {
    public CategoriesSchema = new mongoose.Schema({
        Fruits: {
            ApplesBananasPears: {
                Apple: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Banana: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Pear: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }

            },

            Berries: {
                Strawberry: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Blueberry: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Raspberry: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Cherry: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            Citrus: {
                Orange: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Lemon: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Mosambi: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Kiwi: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            GrapesChickooPomegranate: {
                Grape: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Chickoo: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Pomegranate: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },

            Mangoes:
            {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            },
            Melons: {
                Watermelon: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Muskmelon: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Sunmelon: {
                      type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            PlumsPeachesFigsApricots: {
                Plum: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Peach: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Fig: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Apricot: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            DryFruits:
            {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            },
            OtherFruits:
            {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            }

        },
        DailyVegetables: {
            OnionsPotatoesTomatoes: {
                Onion: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Potato: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Tomato: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }

            },

            BeansBrinjalsOkra: {
                Beans: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Brinjal: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Okra: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            BroccoliCabbageCauliflower: {
                Broccoli: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Cabbage: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Cauliflower: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            GourdsPumpkinDrumstick: {
                BitterGourdKarela: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                SnakeGourdParwal: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                RidgeGourdDodka: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                BottleGourdLauki: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Tinda: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Pumpkin: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Drumstick: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },

            ChiliesGarlicLemonGinger:
            {
                Chilly: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Garlic: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Lemon: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Ginger: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            CucumberCapsicum: {
                Cucumber: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                CapsicumRed: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                CapsicumYellow: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                CapsicumGreen: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            PeasCorn: {
                Peas: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Corn: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            RootVegetables:
            {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            },
            OtherDailyVegetables:
            {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            }

        },

        ExoticVegetables: {
            AvocadosPeppers: {
                Avocado: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Pepper: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }

            },

            BroccoliZucchini: {
                Broccoli: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Zucchini: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            AsparagusArtichokes: {
                Asparagus: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Artichoke: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            CeleryFennelLeeks: {
                Celery: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Fennel: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Leek: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },

            EdibleFlowers:
            {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            },

            LettuceLeafyVegetables: {

                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            },
            Mushrooms: {

                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            },
            OtherExoticVegetables:
            {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            }

        },

        Organic: {
            OrganicFruits: {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            },

            OrganicVegetables: {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            }
        },

        Exotic: {
            ExoticFruits: {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            },

            ExotiicVegetables: {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            }
        },

        HerbsSeasoning: {
            
            LemonGingerGarlic: {
                Lemon: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Ginger: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                },
                Garlic: {
                    type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
                }
            },
            IndianHerbs: {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            },
        
            OtherHerbsSeasoning:
            {
                type: [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
            }

        },

    });
}

let C = new Categories();
export let categories = mongoose.model("Categories", C.CategoriesSchema);
