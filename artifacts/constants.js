export const DAPP_NAME = "Lucky";

export const SS58_PREFIX = {
  astar:5,
  shiden:5,
  shibuya:5,
  rococo:42,
  westend:42
};

export const NETWORK_TOKENS = {
  astar:"ASTR",
  shiden:"SDN",
  shibuya:"SBY"
}

export const TOKEN_DECIMALS = {
  ASTR: 18,
  SDN: 18,
  SBY: 18
};

export const CONTRACT_STAKING_URL = {
  shibuya: "https://portal.astar.network/#/shibuya-testnet/dapp-staking/dapp?dapp=bfh3ckzo3ydndgo7evd3utfnoaj5fdy9nycmpzg23vjfhnw"
}

export const QUERY_URL = "https://api.subquery.network/sq/GuiGou12358/lucky---shibuya"

export const REWARD_MANAGER_CONTRACT_ADDRESS = "W66fXdDBkcp7RkZmsS7qLLpjdHB4FDSqWgJArbvCYG3PQ48";

export const REWARD_MANAGER_CONTRACT_ABI = {
  "source": {
    "hash": "0xe67d52d825468d8f819366bdf9492657145550aa795a6c46310b2f36528a041f",
    "language": "ink! 4.0.0-beta",
    "compiler": "rustc 1.65.0-nightly",
    "build_info": {
      "build_mode": "Debug",
      "cargo_contract_version": "2.0.0-rc",
      "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
      "wasm_opt_settings": {
        "keep_debug_symbols": false,
        "optimization_passes": "Z"
      }
    }
  },
  "contract": {
    "name": "reward_manager",
    "version": "0.1.0",
    "authors": [
      "guigou"
    ]
  },
  "spec": {
    "constructors": [
      {
        "args": [],
        "docs": [],
        "label": "new",
        "payable": false,
        "returnType": {
          "displayName": [
            "ink_primitives",
            "ConstructorResult"
          ],
          "type": 3
        },
        "selector": "0x9bae9d5e"
      }
    ],
    "docs": [],
    "events": [
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "account",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 13
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "era",
            "type": {
              "displayName": [
                "u32"
              ],
              "type": 1
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "amount",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          }
        ],
        "docs": [
          " Event emitted when a reward is pending"
        ],
        "label": "PendingReward"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "account",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 13
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "amount",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          }
        ],
        "docs": [
          " Event emitted when a user claim rewards"
        ],
        "label": "RewardsClaimed"
      }
    ],
    "lang_error": {
      "displayName": [
        "ink",
        "LangError"
      ],
      "type": 4
    },
    "messages": [
      {
        "args": [
          {
            "label": "new_code_hash",
            "type": {
              "displayName": [],
              "type": 5
            }
          }
        ],
        "docs": [],
        "label": "upgrade_contract",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 7
        },
        "selector": "0x1345543d"
      },
      {
        "args": [],
        "docs": [],
        "label": "get_role_reward_manager",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0xe37044e4"
      },
      {
        "args": [],
        "docs": [],
        "label": "get_role_reward_viewer",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0x3c40d3be"
      },
      {
        "args": [
          {
            "label": "from",
            "type": {
              "displayName": [
                "psp22reward_external",
                "GetPendingRewardsFromInput1"
              ],
              "type": 13
            }
          }
        ],
        "docs": [
          " return the pending rewards for a given account."
        ],
        "label": "Psp22Reward::get_pending_rewards_from",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 14
        },
        "selector": "0xf53a4041"
      },
      {
        "args": [],
        "docs": [
          " return true if the current account has pending rewards"
        ],
        "label": "Psp22Reward::has_pending_rewards",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 17
        },
        "selector": "0x4fa2ad68"
      },
      {
        "args": [],
        "docs": [
          " claim all pending rewards for the current account",
          " After claiming, there is not anymore pending rewards for this account"
        ],
        "label": "Psp22Reward::claim",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 19
        },
        "selector": "0x51be5832"
      },
      {
        "args": [
          {
            "label": "era",
            "type": {
              "displayName": [
                "psp22reward_external",
                "FundRewardsAndAddWinnersInput1"
              ],
              "type": 1
            }
          },
          {
            "label": "accounts",
            "type": {
              "displayName": [
                "psp22reward_external",
                "FundRewardsAndAddWinnersInput2"
              ],
              "type": 21
            }
          }
        ],
        "docs": [
          " Add the accounts in the list of winners for a given era",
          " accounts contains the list of winners and the rewards by account"
        ],
        "label": "Psp22Reward::fund_rewards_and_add_winners",
        "mutates": true,
        "payable": true,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 19
        },
        "selector": "0xc218e5ba"
      },
      {
        "args": [
          {
            "label": "role",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "RevokeRoleInput1"
              ],
              "type": 1
            }
          },
          {
            "label": "account",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "RevokeRoleInput2"
              ],
              "type": 13
            }
          }
        ],
        "docs": [
          " Revokes `role` from `account`.",
          "",
          " On success a `RoleRevoked` event is emitted.",
          "",
          " # Errors",
          "",
          " Returns with `MissingRole` error if caller can't grant the `role` or if `account` doesn't have `role`."
        ],
        "label": "AccessControl::revoke_role",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x6e4f0991"
      },
      {
        "args": [
          {
            "label": "role",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "HasRoleInput1"
              ],
              "type": 1
            }
          },
          {
            "label": "address",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "HasRoleInput2"
              ],
              "type": 13
            }
          }
        ],
        "docs": [
          " Returns `true` if `account` has been granted `role`."
        ],
        "label": "AccessControl::has_role",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 17
        },
        "selector": "0xc1d9ac18"
      },
      {
        "args": [
          {
            "label": "role",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "GetRoleAdminInput1"
              ],
              "type": 1
            }
          }
        ],
        "docs": [
          " Returns the admin role that controls `role`. See `grant_role` and `revoke_role`."
        ],
        "label": "AccessControl::get_role_admin",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0x83da3bb2"
      },
      {
        "args": [
          {
            "label": "role",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "GrantRoleInput1"
              ],
              "type": 1
            }
          },
          {
            "label": "account",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "GrantRoleInput2"
              ],
              "type": 13
            }
          }
        ],
        "docs": [
          " Grants `role` to `account`.",
          "",
          " On success a `RoleGranted` event is emitted.",
          "",
          " # Errors",
          "",
          " Returns with `MissingRole` error if caller can't grant the role.",
          " Returns with `RoleRedundant` error `account` has `role`."
        ],
        "label": "AccessControl::grant_role",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x4ac062fd"
      },
      {
        "args": [
          {
            "label": "role",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "RenounceRoleInput1"
              ],
              "type": 1
            }
          },
          {
            "label": "account",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "RenounceRoleInput2"
              ],
              "type": 13
            }
          }
        ],
        "docs": [
          " Revokes `role` from the calling account.",
          " Roles are often managed via `grant_role` and `revoke_role`: this function's",
          " purpose is to provide a mechanism for accounts to lose their privileges",
          " if they are compromised (such as when a trusted device is misplaced).",
          "",
          " On success a `RoleRevoked` event is emitted.",
          "",
          " # Errors",
          "",
          " Returns with `InvalidCaller` error if caller is not `account`.",
          " Returns with `MissingRole` error if `account` doesn't have `role`."
        ],
        "label": "AccessControl::renounce_role",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0xeaf1248a"
      }
    ]
  },
  "storage": {
    "root": {
      "layout": {
        "struct": {
          "fields": [
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0xe2b0cbca",
                              "ty": 0
                            }
                          },
                          "root_key": "0xe2b0cbca"
                        }
                      },
                      "name": "pending_rewards"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "reward"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x6a2cd2b4",
                              "ty": 1
                            }
                          },
                          "root_key": "0x6a2cd2b4"
                        }
                      },
                      "name": "admin_roles"
                    },
                    {
                      "layout": {
                        "struct": {
                          "fields": [
                            {
                              "layout": {
                                "root": {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x5d5db175",
                                      "ty": 2
                                    }
                                  },
                                  "root_key": "0x5d5db175"
                                }
                              },
                              "name": "members"
                            },
                            {
                              "layout": {
                                "enum": {
                                  "dispatchKey": "0x00000000",
                                  "name": "Option",
                                  "variants": {
                                    "0": {
                                      "fields": [],
                                      "name": "None"
                                    },
                                    "1": {
                                      "fields": [
                                        {
                                          "layout": {
                                            "leaf": {
                                              "key": "0x00000000",
                                              "ty": 2
                                            }
                                          },
                                          "name": "0"
                                        }
                                      ],
                                      "name": "Some"
                                    }
                                  }
                                }
                              },
                              "name": "_reserved"
                            }
                          ],
                          "name": "Members"
                        }
                      },
                      "name": "members"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 2
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "access"
            }
          ],
          "name": "Contract"
        }
      },
      "root_key": "0x00000000"
    }
  },
  "types": [
    {
      "id": 0,
      "type": {
        "def": {
          "primitive": "u128"
        }
      }
    },
    {
      "id": 1,
      "type": {
        "def": {
          "primitive": "u32"
        }
      }
    },
    {
      "id": 2,
      "type": {
        "def": {
          "tuple": []
        }
      }
    },
    {
      "id": 3,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 2
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 2
          },
          {
            "name": "E",
            "type": 4
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 4,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 1,
                "name": "CouldNotReadInput"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "LangError"
        ]
      }
    },
    {
      "id": 5,
      "type": {
        "def": {
          "array": {
            "len": 32,
            "type": 6
          }
        }
      }
    },
    {
      "id": 6,
      "type": {
        "def": {
          "primitive": "u8"
        }
      }
    },
    {
      "id": 7,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 8
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 8
          },
          {
            "name": "E",
            "type": 4
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 8,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 2
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 2
          },
          {
            "name": "E",
            "type": 9
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 9,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 10,
                    "typeName": "RewardError"
                  }
                ],
                "index": 0,
                "name": "RewardError"
              },
              {
                "fields": [
                  {
                    "type": 11,
                    "typeName": "AccessControlError"
                  }
                ],
                "index": 1,
                "name": "AccessControlError"
              },
              {
                "index": 2,
                "name": "UpgradeError"
              }
            ]
          }
        },
        "path": [
          "reward_manager",
          "reward_manager",
          "ContractError"
        ]
      }
    },
    {
      "id": 10,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "InsufficientTransferredBalance"
              },
              {
                "index": 1,
                "name": "TransferError"
              },
              {
                "index": 2,
                "name": "AddOverFlow"
              },
              {
                "index": 3,
                "name": "NoReward"
              },
              {
                "fields": [
                  {
                    "type": 11,
                    "typeName": "AccessControlError"
                  }
                ],
                "index": 4,
                "name": "AccessControlError"
              }
            ]
          }
        },
        "path": [
          "lucky",
          "traits",
          "reward",
          "psp22_reward",
          "RewardError"
        ]
      }
    },
    {
      "id": 11,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "InvalidCaller"
              },
              {
                "index": 1,
                "name": "MissingRole"
              },
              {
                "index": 2,
                "name": "RoleRedundant"
              }
            ]
          }
        },
        "path": [
          "openbrush_contracts",
          "traits",
          "errors",
          "access_control",
          "AccessControlError"
        ]
      }
    },
    {
      "id": 12,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 1
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 1
          },
          {
            "name": "E",
            "type": 4
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 13,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 5,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "AccountId"
        ]
      }
    },
    {
      "id": 14,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 15
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 15
          },
          {
            "name": "E",
            "type": 4
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 15,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 16
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 16
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 16,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 0
                  }
                ],
                "index": 1,
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 0
          }
        ],
        "path": [
          "Option"
        ]
      }
    },
    {
      "id": 17,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 18
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 18
          },
          {
            "name": "E",
            "type": 4
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 18,
      "type": {
        "def": {
          "primitive": "bool"
        }
      }
    },
    {
      "id": 19,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 20
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 20
          },
          {
            "name": "E",
            "type": 4
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 20,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 2
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 2
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 21,
      "type": {
        "def": {
          "sequence": {
            "type": 22
          }
        }
      }
    },
    {
      "id": 22,
      "type": {
        "def": {
          "tuple": [
            13,
            0
          ]
        }
      }
    },
    {
      "id": 23,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 24
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 24
          },
          {
            "name": "E",
            "type": 4
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 24,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 2
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 2
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    }
  ],
  "version": "4"
}