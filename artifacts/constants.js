export const DAPP_STAKING_CONTRACT_ADDRESS = "bc3yCAej7WxPBi4x1Ba1zru9HtieZrW7jk15QmGWSwZ7D6G";

export const REWARD_MANAGER_CONTRACT_ADDRESS = "XuPw8i9hzwHmN5TgcKQRwMbjYjLhq4v94gW7opAFsJhksta";

export const REWARD_MANAGER_CONTRACT_ABI = {
  "source": {
    "hash": "0xadf483bd0643d47d0b8c951818c3a70879b7a405ad206ce72e50fdababda128d",
    "language": "ink! 3.4.0",
    "compiler": "rustc 1.65.0-nightly"
  },
  "contract": {
    "name": "reward_manager",
    "version": "0.1.0",
    "authors": [
      "guigou"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [],
          "docs": [],
          "label": "new",
          "payable": false,
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
                "type": 2
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
                "type": 6
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
                "type": 2
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
                "type": 6
              }
            }
          ],
          "docs": [
            " Event emitted when a user claim rewards"
          ],
          "label": "RewardsClaimed"
        }
      ],
      "messages": [
        {
          "args": [
            {
              "label": "new_code_hash",
              "type": {
                "displayName": [],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "upgrade_contract",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 19
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
              "RoleType"
            ],
            "type": 5
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
              "RoleType"
            ],
            "type": 5
          },
          "selector": "0x3c40d3be"
        },
        {
          "args": [],
          "docs": [
            " claim all pending rewards",
            " After claiming, there is not anymore pending rewards for this account"
          ],
          "label": "Psp22Reward::claim",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22reward_external",
              "ClaimOutput"
            ],
            "type": 23
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
                  "FundRewardsInput1"
                ],
                "type": 5
              }
            }
          ],
          "docs": [
            " Set the total rewards shared by all winners for a given era"
          ],
          "label": "Psp22Reward::fund_rewards",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "psp22reward_external",
              "FundRewardsOutput"
            ],
            "type": 24
          },
          "selector": "0x1c9b16f3"
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
                "type": 5
              }
            },
            {
              "label": "accounts",
              "type": {
                "displayName": [
                  "psp22reward_external",
                  "FundRewardsAndAddWinnersInput2"
                ],
                "type": 25
              }
            }
          ],
          "docs": [
            " Set the total rewards shared by all winners for a given era",
            " And add accounts in the list of winners for a given era",
            " and share the remaining rewards among the winners in function of the ratio distribution set before",
            "",
            " combination of the methods fund_rewards and _add_winners"
          ],
          "label": "Psp22Reward::fund_rewards_and_add_winners",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "psp22reward_external",
              "FundRewardsAndAddWinnersOutput"
            ],
            "type": 26
          },
          "selector": "0xc218e5ba"
        },
        {
          "args": [
            {
              "label": "ratio",
              "type": {
                "displayName": [
                  "psp22reward_external",
                  "SetRatioDistributionInput1"
                ],
                "type": 10
              }
            }
          ],
          "docs": [
            " Set the rate sharing by teh winners",
            " First winner will receive (total_rewards * ratio[0]) / sum(ratio)",
            " Second winner will receive (total_rewards * ratio[1]) / sum(ratio)",
            " if ratio[n] equals to zero or is empty, tne winner n will receive nothing"
          ],
          "label": "Psp22Reward::set_ratio_distribution",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22reward_external",
              "SetRatioDistributionOutput"
            ],
            "type": 24
          },
          "selector": "0x39ca04a9"
        },
        {
          "args": [
            {
              "label": "era",
              "type": {
                "displayName": [
                  "psp22reward_external",
                  "ListPendingRewardsFromInput1"
                ],
                "type": 28
              }
            },
            {
              "label": "account",
              "type": {
                "displayName": [
                  "psp22reward_external",
                  "ListPendingRewardsFromInput2"
                ],
                "type": 29
              }
            }
          ],
          "docs": [
            " return the pending rewards for a given era and a given account.",
            " If the era is None, the function returns the pending rewards for all era",
            " If the account is None, the function returns the pending rewards for all accounts"
          ],
          "label": "Psp22Reward::list_pending_rewards_from",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22reward_external",
              "ListPendingRewardsFromOutput"
            ],
            "type": 30
          },
          "selector": "0x9b32a59a"
        },
        {
          "args": [],
          "docs": [
            " Return true if the the given account has pending rewards"
          ],
          "label": "Psp22Reward::has_pending_rewards",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22reward_external",
              "HasPendingRewardsOutput"
            ],
            "type": 31
          },
          "selector": "0x4fa2ad68"
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
                "type": 5
              }
            },
            {
              "label": "address",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "HasRoleInput2"
                ],
                "type": 2
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
              "accesscontrol_external",
              "HasRoleOutput"
            ],
            "type": 32
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
                  "RevokeRoleInput1"
                ],
                "type": 5
              }
            },
            {
              "label": "account",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "RevokeRoleInput2"
                ],
                "type": 2
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
              "accesscontrol_external",
              "RevokeRoleOutput"
            ],
            "type": 33
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
                  "GrantRoleInput1"
                ],
                "type": 5
              }
            },
            {
              "label": "account",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "GrantRoleInput2"
                ],
                "type": 2
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
              "accesscontrol_external",
              "GrantRoleOutput"
            ],
            "type": 33
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
                "type": 5
              }
            },
            {
              "label": "account",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "RenounceRoleInput2"
                ],
                "type": 2
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
              "accesscontrol_external",
              "RenounceRoleOutput"
            ],
            "type": 33
          },
          "selector": "0xeaf1248a"
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
                "type": 5
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
              "accesscontrol_external",
              "GetRoleAdminOutput"
            ],
            "type": 5
          },
          "selector": "0x83da3bb2"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "struct": {
                "fields": [
                  {
                    "layout": {
                      "cell": {
                        "key": "0x958a663500000000000000000000000000000000000000000000000000000000",
                        "ty": 0
                      }
                    },
                    "name": "pending_rewards"
                  },
                  {
                    "layout": {
                      "cell": {
                        "key": "0x968a663500000000000000000000000000000000000000000000000000000000",
                        "ty": 7
                      }
                    },
                    "name": "remaining_rewards"
                  },
                  {
                    "layout": {
                      "cell": {
                        "key": "0x978a663500000000000000000000000000000000000000000000000000000000",
                        "ty": 10
                      }
                    },
                    "name": "ratio_distribution"
                  },
                  {
                    "layout": {
                      "cell": {
                        "key": "0x988a663500000000000000000000000000000000000000000000000000000000",
                        "ty": 6
                      }
                    },
                    "name": "total_ratio_distribution"
                  }
                ]
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
                      "cell": {
                        "key": "0x75b08c5a00000000000000000000000000000000000000000000000000000000",
                        "ty": 11
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
                              "cell": {
                                "key": "0x2779f6fc00000000000000000000000000000000000000000000000000000000",
                                "ty": 14
                              }
                            },
                            "name": "members"
                          },
                          {
                            "layout": {
                              "enum": {
                                "dispatchKey": "0x2879f6fc00000000000000000000000000000000000000000000000000000000",
                                "variants": {
                                  "0": {
                                    "fields": [
                                      {
                                        "layout": {
                                          "cell": {
                                            "key": "0x2979f6fc00000000000000000000000000000000000000000000000000000000",
                                            "ty": 16
                                          }
                                        },
                                        "name": null
                                      }
                                    ]
                                  },
                                  "1": {
                                    "fields": []
                                  }
                                }
                              }
                            },
                            "name": "_reserved"
                          }
                        ]
                      }
                    },
                    "name": "members"
                  },
                  {
                    "layout": {
                      "enum": {
                        "dispatchKey": "0x76b08c5a00000000000000000000000000000000000000000000000000000000",
                        "variants": {
                          "0": {
                            "fields": [
                              {
                                "layout": {
                                  "cell": {
                                    "key": "0x77b08c5a00000000000000000000000000000000000000000000000000000000",
                                    "ty": 16
                                  }
                                },
                                "name": null
                              }
                            ]
                          },
                          "1": {
                            "fields": []
                          }
                        }
                      }
                    },
                    "name": "_reserved"
                  }
                ]
              }
            },
            "name": "access"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "sequence": {
              "type": 1
            }
          }
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "tuple": [
              2,
              5,
              6
            ]
          }
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 3,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_env",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 4
            }
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "primitive": "u32"
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 8
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 5
            },
            {
              "name": "V",
              "type": 6
            }
          ],
          "path": [
            "openbrush_lang",
            "storage",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "sequence": {
              "type": 9
            }
          }
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "tuple": [
              5,
              6
            ]
          }
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "sequence": {
              "type": 6
            }
          }
        }
      },
      {
        "id": 11,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 12
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 5
            },
            {
              "name": "V",
              "type": 5
            }
          ],
          "path": [
            "openbrush_lang",
            "storage",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 12,
        "type": {
          "def": {
            "sequence": {
              "type": 13
            }
          }
        }
      },
      {
        "id": 13,
        "type": {
          "def": {
            "tuple": [
              5,
              5
            ]
          }
        }
      },
      {
        "id": 14,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 17
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 15
            },
            {
              "name": "V",
              "type": 16
            }
          ],
          "path": [
            "openbrush_lang",
            "storage",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 15,
        "type": {
          "def": {
            "tuple": [
              5,
              2
            ]
          }
        }
      },
      {
        "id": 16,
        "type": {
          "def": {
            "tuple": []
          }
        }
      },
      {
        "id": 17,
        "type": {
          "def": {
            "sequence": {
              "type": 18
            }
          }
        }
      },
      {
        "id": 18,
        "type": {
          "def": {
            "tuple": [
              15,
              16
            ]
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
                      "type": 16
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 20
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
              "type": 20
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
                      "type": 21,
                      "typeName": "RewardError"
                    }
                  ],
                  "index": 0,
                  "name": "RewardError"
                },
                {
                  "fields": [
                    {
                      "type": 22,
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
        "id": 21,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "NoReward"
                },
                {
                  "index": 1,
                  "name": "NoRatioSet"
                },
                {
                  "index": 2,
                  "name": "InsufficientTransferredBalance"
                },
                {
                  "index": 3,
                  "name": "TransferError"
                },
                {
                  "index": 4,
                  "name": "DivByZero"
                },
                {
                  "index": 5,
                  "name": "MulOverFlow"
                },
                {
                  "index": 6,
                  "name": "AddOverFlow"
                },
                {
                  "fields": [
                    {
                      "type": 22,
                      "typeName": "AccessControlError"
                    }
                  ],
                  "index": 7,
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
        "id": 22,
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
        "id": 23,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 6
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 21
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
              "type": 6
            },
            {
              "name": "E",
              "type": 21
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
                      "type": 16
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 21
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
              "type": 21
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 25,
        "type": {
          "def": {
            "sequence": {
              "type": 2
            }
          }
        }
      },
      {
        "id": 26,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 27
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 21
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
              "type": 27
            },
            {
              "name": "E",
              "type": 21
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 27,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "era",
                  "type": 5,
                  "typeName": "u32"
                },
                {
                  "name": "given_reward",
                  "type": 6,
                  "typeName": "Balance"
                },
                {
                  "name": "nb_winners",
                  "type": 4,
                  "typeName": "u8"
                }
              ]
            }
          },
          "path": [
            "lucky",
            "traits",
            "reward",
            "psp22_reward",
            "PendingReward"
          ]
        }
      },
      {
        "id": 28,
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
                      "type": 5
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
              "type": 5
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 29,
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
                      "type": 2
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
              "type": 2
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 30,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 0
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 21
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
              "type": 0
            },
            {
              "name": "E",
              "type": 21
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 31,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 32
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 21
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
              "type": 32
            },
            {
              "name": "E",
              "type": 21
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 32,
        "type": {
          "def": {
            "primitive": "bool"
          }
        }
      },
      {
        "id": 33,
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
                      "type": 22
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
              "type": 22
            }
          ],
          "path": [
            "Result"
          ]
        }
      }
    ]
  }
}