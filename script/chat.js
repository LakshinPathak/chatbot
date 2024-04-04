// initialize by constructing a named function..chat-bubble.
// .and add text processing plugin:
var chatWindow = new Bubbles(document.getElementById("chat"), "chatWindow", {
  // the one that we care about is inputCallbackFn()
  // this function returns an object with some data that we can process from user input
  // and understand the context of it

  // this is an example function that matches the text user typed to one of the answer bubbles
  // this function does no natural language processing
  // this is where you may want to connect this script to NLC backend.
  inputCallbackFn: function(o) {
    // add error conversation block & recall it if no answer matched
    var miss = function() {
      chatWindow.talk(
        {
          "i-dont-get-it": {
            says: [
              "Sorry, I don't get it 😕. Pls repeat? Or you can just click below 👇"
            ],
            reply: o.convo[o.standingAnswer].reply
          }
        },
        "i-dont-get-it"
      )
    }

    // do this if answer found
    var match = function(key) {
      setTimeout(function() {
        chatWindow.talk(convo, key) // restart current convo from point found in the answer
      }, 600)
    }

    // sanitize text for search function
    var strip = function(text) {
      return text.toLowerCase().replace(/[\s.,\/#!$%\^&\*;:{}=\-_'"`~()]/g, "")
    }

    // search function
    var found = false
    o.convo[o.standingAnswer].reply.forEach(function(e, i) {
      strip(e.question).includes(strip(o.input)) && o.input.length > 0
        ? (found = e.answer)
        : found ? null : (found = false)
    })
    found ? match(found) : miss()
  }
}) // done setting up chat-bubble

// conversation object defined separately, but just the same as in the
// "Basic chat-bubble Example" (1-basics.html)
var convo = {
  "ice": {
    says: ["Hi! Welcome to Travigo..", "How may I help you?"],
     reply: [
      {
        question: "Need hotel recommendation",
        answer: "recommend"
      },
      {
        question: "Get Information about a hotel",
        answer: "info"
      },
      {
        question: "Book a hotel",
        answer: "book"
      }
    ]
  },
  "book":{
    says: ["Booking facility is not available in Travigo Chatbot. In order to book hotels, go to Travigo website or visit the website of the respective hotels."],
    reply: [
      {question: "Start Over",
        answer: "ice"}
    ]
  },
  "recommend":{
    says: ["Choose rooms you want to stay in"],
    reply: [
      {
        question: "Premium Rooms",
        answer: "beds"
      },
      {
        question: "Deluxe Rooms",
        answer: "beds"
      },
      {
        question: "Standard Rooms",
        answer: "beds"
      }
    ]
  },
  "beds":{
    says: ["Do you need extra beds in your room?"],
    reply: [
      {
        question: "Yes",
        answer: "food"
      },
      {
        question: "No",
        answer: "food"
      }
    ]
  },
  "food":{
    says: ["Any extra requirements you want to add on? "],
    reply: [
      {
        question: "breakfast",
        answer: "budget"
      },
      {
        question: "lunch",
        answer: "budget"
      },
      {
        question: "dinner",
        answer: "budget"
      },
      {
        question: "dessert",
        answer: "budget"
      }
    ]
  },
  "budget":{
    says: ["Please choose your budget"],
    reply: [
      {
        question: "<5000",
        answer: "country"
      },
      {
        question: ">5000",
        answer: "country"
      }
    ]
  },
  

  "country": {
    says: ["Great! Choose Country you want to stay in.."],
    reply: [
      {
        question: "United Nations",
        answer: "United Nations rooms"
      },
      {
        question: "United Kingdom",
        answer: "United Kingdom rooms"
      },
      {
        question: "Italy",
        answer: "Italy rooms"
      },
      {
        question: "Mexico",
        answer: "Mexico rooms"
      },
      {
        question: "Switzerland",
        answer: "Switzerland rooms"
      },
      {
        question: "Tanzania",
        answer: "Tanzania rooms"
      },
      {
        question: "Netherlands",
        answer: "Netherlands rooms"
      },
      {
        question: "Fiji",
        answer: "Fiji rooms"
      },
      {
        question: "Indonesia",
        answer: "Indonesia rooms"
      },
      {
        question: "Canada",
        answer: "Canada rooms"
      },
      {
        question: "Thailand",
        answer: "Thailand rooms"
      },
      {
        question: "United Arab Emirates",
        answer: "United Arab Emirates rooms"
      },
      {
        question: "Greece",
        answer: "Greece rooms"
      },
      {
        question: "Costa Rica",
        answer: "Costa Rica rooms"
      },
      {
        question: "Japan",
        answer: "Japan rooms"
      },
    ]
  },
  "United States rooms": {
    says: ["There are a lot of options.. We recommend you.. ","Cozy BeachFront Cottage","Modern Loft in Downtown","Mountain Retreat","Scheduled Treehouse Getaway","BeachFront Paradise","Rustic Cabin by the Lake","Luxury Penthouse with City Views","Historic Canal House","Charming Cottage in Cotswolds","Historic Brownstone in Boston","Lakefront Cabin in New Hampshire","Ski Chalet in Aspen","Secluded Beach House in Costa Rica"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Italy rooms": {
    says: ["We recommend you.. Historic Villa in Tuscany"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Mexico rooms": {
    says: ["We recommend you.. Beachfront Paradise"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Switzerland rooms": {
    says: ["We recommend you.. Ski-In/Ski-Out Chalet"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Tanzania rooms": {
    says: ["We recommend you.. Safari Lodge in the Serengeti"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Netherlands rooms": {
    says: ["We recommend you.. Historic Canal House"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Fiji rooms": {
    says: ["We recommend you.. Private Island Retreat"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "United Kingdom rooms": {
    says: ["We recommend you.. ","Charming Cottage in the Costwolds","Historic Castle in Scotland"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Indonesia rooms": {
    says: ["We recommend you.. Beachfront Bungalow in Bali"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Canada rooms": {
    says: ["We recommend you.. ","Mountain View Cabin in Banff","Lakefront Cabin in New Hampshire"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Thailand rooms": {
    says: ["We recommend you.. Tropical Villa in Phuket"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "United Arab Emirates rooms": {
    says: ["We recommend you.. Dessert Oasis in Dubai"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Greece rooms": {
    says: ["We recommend you.. Beachfront Villa in Greece"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Japan rooms": {
    says: ["We recommend you.. Modern Apartment in Tokyo"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Costa Rica rooms": {
    says: ["We recommend you..","Secluded Beach House in Costa Rica","Eco-Friendly Treehouse Retreat"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "Maldives rooms": {
    says: ["We recommend you.. Luxury Villa in Maldives"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "info": {
    says: ["Great! Choose the country you want to know information about.."],
    reply: [
      {
        question: "United Nations",
        answer: "United Nations"
      },
      {
        question: "United Kingdom",
        answer: "United Kingdom"
      },
      {
        question: "Italy",
        answer: "Italy"
      },
      {
        question: "Mexico",
        answer: "Mexico"
      },
      {
        question: "Switzerland",
        answer: "Switzerland"
      },
      {
        question: "Tanzania",
        answer: "Tanzania"
      },
      {
        question: "Netherlands",
        answer: "Netherlands"
      },
      {
        question: "Fiji",
        answer: "Fiji"
      },
      {
        question: "Indonesia",
        answer: "Indonesia"
      },
      {
        question: "Canada",
        answer: "Canada"
      },
      {
        question: "Thailand",
        answer: "Thailand"
      },
      {
        question: "United Arab Emirates",
        answer: "United Arab Emirates"
      },
      {
        question: "Greece",
        answer: "Greece"
      },
      {
        question: "Costa Rica",
        answer: "Costa Rica"
      },
      {
        question: "Japan",
        answer: "Japan"
      },
      {
        question: "Maldives",
        answer: "Maldives"
      }
    ]
    
  },
  "United States": {
    says: ["Choose the hotel you want to know information about.."],
    
      reply: [
        {
          question: "Cozy BeachFront Cottage",
          answer: "cbc"
        },
        {
          question: "Modern Loft in Downtown",
          answer: "mlid"
        },
        {
          question: "Mountain Retreat",
          answer: "mr"
        },
        {
          question: "Scheduled Treehouse Getaway",
          answer: "stg"
        },
        {
          question: "Rustic Cabin by the Lake",
          answer: "rcbtl"
        },
        {
          question: "Luxury Penthouse with City Views",
          answer: "lpwcv"
        },
        {
          question: "Historic Brownstone in Boston",
          answer: "hbib"
        },{
          question: "Art Deco Apartment in Miami",
          answer: "adaim"
        },
        {
          question: "Rustic Log Cabin in Montana",
          answer: "rlcin"
        },
        {
          question: "Lakefront Cabin in New Hampshire",
          answer: "lcinh"
        },
        {
          question: "Ski Chalet in Aspen",
          answer: "scia"
        },
        {
          question: "Historic Cottage in Charleston",
          answer: "hcic"
        }
      ]
    
  },
  "cbc":{
says: ["Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.","Price: 1500","Location: Malibu","Country: United States"],
reply: [
  {
    question: "Start Over",
    answer: "ice"
  }
]
  },
  "mlid":{
    says: ["Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!","Price: 1200","Location: New York City","Country: United States"],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
      },
      "mr":{
        says: ["Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.","Price: 1000","Location: Aspen","Country: United States"],
        reply: [
          {
            question: "Start Over",
            answer: "ice"
          }
        ]
          },
          "stg":{
            says: ["Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.","Price: 800","Location: Portland","Country: United States"],
            reply: [
              {
                question: "Start Over",
                answer: "ice"
              }
            ]
              },
              "rcbtl":{
                says: ["Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.","Price: 900","Location: Lake Tahoe","Country: United States"],
                reply: [
                  {
                    question: "Start Over",
                    answer: "ice"
                  }
                ]
                  }, 
"lpwcv":{
                    says: ["Indulge in luxury living with panoramic city views from this stunning penthouse apartment.","Price: 3500","Location: Los Angeles","Country: United States"],
                    reply: [
                      {
                        question: "Start Over",
                        answer: "ice"
                      }
                    ]
    }, 
    "ccic":{
      says: ["Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.","Price: 1200","Location: Cotswolds","Country: United States"],
      reply: [
        {
          question: "Start Over",
          answer: "ice"
        }
      ]
        }, 
        "hbib":{
          says: ["Step back in time in this elegant historic brownstone located in the heart of Boston.","Price: 2200","Location: Boston","Country: United States"],
          reply: [
            {
              question: "Start Over",
              answer: "ice"
            }
          ]
            },
            "adaim":{
              says: ["Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.","Price: 1600","Location: Miami","Country: United States"],
              reply: [
                {
                  question: "Start Over",
                  answer: "ice"
                }
              ]
                }, 
                "rlcim":{
                  says: ["Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.","Price: 1100","Location: Montana","Country: United States"],
                  reply: [
                    {
                      question: "Start Over",
                      answer: "ice"
                    }
                  ]
                    }, 
                    "hcic":{
                      says: ["Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.","Price: 1600","Location: Charleston","Country: United States"],
                      reply: [
                        {
                          question: "Start Over",
                          answer: "ice"
                        }
                      ]
                        }, 
                        "lcinh":{
                          says: ["Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.","Price: 1200","Location: Hampshire","Country: United States"],
                          reply: [
                            {
                              question: "Start Over",
                              answer: "ice"
                            }
                          ]
                            }, 
                            "scia":{
                              says: ["Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.","Price: 4000","Location: Aspen","Country: United States"],
                              reply: [
                                {
                                  question: "Start Over",
                                  answer: "ice"
                                }
                              ]
                                }, 
                                            
                                "Italy": {
                                  says: ["Choose the hotel you want to know information about.."],
                                  
                                    reply: [
                                      {
                                        question: "Historic Villa in Tuscany",
                                        answer: "hvit"
                                      }
                                      
                                    ]
                                  
                                },
                                "hvit":{
                              says: ["Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.","Price: 2500","Location: Florence","Country: Italy"],
                              reply: [
                                {
                                  question: "Start Over",
                                  answer: "ice"
                                }]},
                                "Mexico": {
                                  says: ["Choose the hotel you want to know information about.."],
                                  
                                    reply: [
                                      {
                                        question: "Beachfront Paradise",
                                        answer: "bp"
                                      }
                                      
                                    ]
                                  
                                },
                                "bp":{
                              says: ["Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.","Price: 2000","Location: Cancun","Country: Mexico"],
                              reply: [
                                {
                                  question: "Start Over",
                                  answer: "ice"
                                }]},

                                "Switzerland": {
                                  says: ["Choose the hotel you want to know information about.."],
                                  
                                    reply: [
                                      {
                                        question: "Ski-In/Ski-Out Chalet",
                                        answer: "sisoc"
                                      }
                                      
                                    ]
                                  
                                },
                                "sisoc":{
                              says: ["Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.","Price: 3000","Location: Verbier","Country: Switzerland"],
                              reply: [
                                {
                                  question: "Start Over",
                                  answer: "ice"
                                }]},
                                "Tanzania": {
                                  says: ["Choose the hotel you want to know information about.."],
                                  
                                    reply: [
                                      {
                                        question: "Safari Lodge in the Serengeti",
                                        answer: "slits"
                                      }
                                      
                                    ]
                                  
                                },
                                "slits":{
                              says: ["Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.","Price: 4000","Location: Serengeti National Park","Country: Tanzania"],
                              reply: [
                                {
                                  question: "Start Over",
                                  answer: "ice"
                                }]},
                                "Netherlands": {
                                  says: ["Choose the hotel you want to know information about.."],
                                  
                                    reply: [
                                      {
                                        question: "Historic Canal House",
                                        answer: "hch"
                                      }
                                      
                                    ]
                                  
                                },
                                "hch":{
                              says: ["Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.","Price: 1800","Location: Amsterdam","Country: Netherlands"],
                              reply: [
                                {
                                  question: "Start Over",
                                  answer: "ice"
                                }]},
                                "Fiji": {
                                  says: ["Choose the hotel you want to know information about.."],
                                  
                                    reply: [
                                      {
                                        question: "Private Island Retreat",
                                        answer: "pir"
                                      }
                                      
                                    ]
                                  
                                },
                                "pir":{
                              says: ["Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.","Price: 10000","Location: Fiji","Country: Fiji"],
                              reply: [
                                {
                                  question: "Start Over",
                                  answer: "ice"
                                }]},
                                "United Kingdom": {
                                  says: ["Choose the hotel you want to know information about.."],
                                  
                                    reply: [
                                      {
                                        question: "Charming Cottage in the Cotswolds",
                                        answer: "ccitc"
                                      },
                                      {
                                        question: "Historic Castle in Scotland",
                                        answer: "hcis"
                                      }
                                      
                                    ]
                                  
                                },
                                "ccitc":{
                              says: ["Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.","Price: 1200","Location: Cotswolds","Country: United Kingdom"],
                              reply: [
                                {
                                  question: "Start Over",
                                  answer: "ice"
                                }]},
                                "hcis":{
                                  says: ["Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.","Price: 4000","Location: Scottish Highlands","Country: United Kingdom"],
                                  reply: [
                                    {
                                      question: "Start Over",
                                      answer: "ice"
                                    }]},
                                    "Indonesia": {
                                      says: ["Choose the hotel you want to know information about.."],
                                      
                                        reply: [
                                          {
                                            question: "Beachfront Bungalow in Bali",
                                            answer: "bbib"
                                          }
                                          
                                        ]
                                      
                                    },
                                    "bbib":{
                                  says: ["Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.","Price: 1800","Location: Bali","Country: Indonesia"],
                                  reply: [
                                    {
                                      question: "Start Over",
                                      answer: "ice"
                                    }]},
                                    "Canada": {
                                      says: ["Choose the hotel you want to know information about.."],
                                      
                                        reply: [
                                          {
                                            question: "Mountain View Cabin in Banff",
                                            answer: "mvcib"
                                          }
                                          
                                        ]
                                      
                                    },
                                    "mvcib":{
                                  says: ["Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.","Price: 1500","Location: Banff","Country: Canada"],
                                  reply: [
                                    {
                                      question: "Start Over",
                                      answer: "ice"
                                    }]},
                                    "Thailand": {
                                      says: ["Choose the hotel you want to know information about.."],
                                      
                                        reply: [
                                          {
                                            question: "Tropical Villa in Phuket",
                                            answer: "tvip"
                                          }
                                          
                                        ]
                                      
                                    },
                                    "tvip":{
                                  says: ["Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.","Price: 3000","Location: Phuket","Country: Thailand"],
                                  reply: [
                                    {
                                      question: "Start Over",
                                      answer: "ice"
                                    }]},  
                                    "United Arab Emirates": {
                                      says: ["Choose the hotel you want to know information about.."],
                                      
                                        reply: [
                                          {
                                            question: "Desert Oasis in Dubai",
                                            answer: "doid"
                                          }
                                          
                                        ]
                                      
                                    },
                                    "doid":{
                                  says: ["Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.","Price: 5000","Location: Dubai","Country: United Arab Emirates"],
                                  reply: [
                                    {
                                      question: "Start Over",
                                      answer: "ice"
                                    }]},  
                                    "Greece": {
                                      says: ["Choose the hotel you want to know information about.."],
                                      
                                        reply: [
                                          {
                                            question: "Beachfront Villa in Greece",
                                            answer: "bvig"
                                          }
                                          
                                        
                                          
                                        ]
                                      
                                    },
                                    "bvig":{
                                  says: ["Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.","Price: 2500","Location: Mykonos","Country: Greece"],
                                  reply: [
                                    {
                                      question: "Start Over",
                                      answer: "ice"
                                    }]}, 
                                    "Costa Rica": {
                                      says: ["Choose the hotel you want to know information about.."],
                                      
                                        reply: [
                                          {
                                            question: "Eco-Friendly Treehouse Retreat",
                                            answer: "eftr"
                                          },
                                          
                                        
                                          {
                                            question: "Secluded Beach House in Costa Rica",
                                            answer: "sbhicr"
                                          }
                                          
                                        ]
                                      
                                    },
                                    "eftr":{
                                  says: ["Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.","Price: 750","Location: Costa Rica","Country: Costa Rica"],
                                  reply: [
                                    {
                                      question: "Start Over",
                                      answer: "ice"
                                    }]},  
                                    "sbhicr":{
                                      says: ["Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.","Price: 1800","Location: Costa Rica","Country: Costa Rica"],
                                      reply: [
                                        {
                                          question: "Start Over",
                                          answer: "ice"
                                        }]},  
                                        "Japan": {
                                          says: ["Choose the hotel you want to know information about.."],
                                          
                                            reply: [
                                              {
                                                question: "Modern Apartment in Tokyo",
                                                answer: "mait"
                                              }
                                              
                                            
                                              
                                            ]
                                          
                                        },
                                        "mait":{
                                      says: ["Explore the vibrant city of Tokyo from this modern and centrally located apartment.","Price: 2000","Location: Tokya","Country: Japan"],
                                      reply: [
                                        {
                                          question: "Start Over",
                                          answer: "ice"
                                        }]}, 
                                        "Maldives": {
                                          says: ["Choose the hotel you want to know information about.."],
                                          
                                            reply: [
                                              {
                                                question: "Luxury Villa in the Maldives",
                                                answer: "lvitm"
                                              }
                                              
                                            
                                              
                                            ]
                                          
                                        },
                                        "lvitm":{
                                      says: ["Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.","Price: 6000","Location: Maldives","Country: Maldives"],
                                      reply: [
                                        {
                                          question: "Start Over",
                                          answer: "ice"
                                        }]}
                        
  
  
}

// pass JSON to your function and you're done!
chatWindow.talk(convo);