/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ENSRegistry,
  ENSRegistryInterface,
} from "../../../../../@ensdomains/ens-contracts/contracts/registry/ENSRegistry";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "label",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "NewOwner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "NewResolver",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "ttl",
        type: "uint64",
      },
    ],
    name: "NewTTL",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "recordExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "resolver",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "ttl",
        type: "uint64",
      },
    ],
    name: "setRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "setResolver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "label",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "setSubnodeOwner",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "label",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "ttl",
        type: "uint64",
      },
    ],
    name: "setSubnodeRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "ttl",
        type: "uint64",
      },
    ],
    name: "setTTL",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "ttl",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060008080526020527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb580546001600160a01b03191633179055610995806100596000396000f3fe608060405234801561001057600080fd5b50600436106100a45760003560e01c80630178b8bf146100a957806302571be3146100eb57806306ab5923146100fe57806314ab90381461011f57806316a25cbd146101345780631896f70a146101745780635b0fc9c3146101875780635ef2c7f01461019a578063a22cb465146101ad578063cf408823146101c0578063e985e9c5146101d3578063f79fe5381461021f575b600080fd5b6100d56100b736600461071d565b6000908152602081905260409020600101546001600160a01b031690565b6040516100e29190610736565b60405180910390f35b6100d56100f936600461071d565b61024a565b61011161010c366004610766565b610279565b6040519081526020016100e2565b61013261012d3660046107b2565b610342565b005b61016761014236600461071d565b600090815260208190526040902060010154600160a01b90046001600160401b031690565b6040516100e291906107de565b6101326101823660046107f2565b6103fa565b6101326101953660046107f2565b6104a7565b6101326101a8366004610815565b610543565b6101326101bb36600461086c565b610565565b6101326101ce3660046108a8565b6105d1565b61020f6101e13660046108f5565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b60405190151581526020016100e2565b61020f61022d36600461071d565b6000908152602081905260409020546001600160a01b0316151590565b6000818152602081905260408120546001600160a01b0316308114156102735750600092915050565b92915050565b60008381526020819052604081205484906001600160a01b0316338114806102c457506001600160a01b038116600090815260016020908152604080832033845290915290205460ff165b6102cd57600080fd5b604080516020808201899052818301889052825180830384018152606090920190925280519101206102ff81866105ec565b85877fce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e82876040516103309190610736565b60405180910390a39695505050505050565b60008281526020819052604090205482906001600160a01b03163381148061038d57506001600160a01b038116600090815260016020908152604080832033845290915290205460ff165b61039657600080fd5b83600080516020610940833981519152846040516103b491906107de565b60405180910390a2505060009182526020829052604090912060010180546001600160401b03909216600160a01b02600160a01b600160e01b0319909216919091179055565b60008281526020819052604090205482906001600160a01b03163381148061044557506001600160a01b038116600090815260016020908152604080832033845290915290205460ff165b61044e57600080fd5b836000805160206109208339815191528460405161046c9190610736565b60405180910390a2505060009182526020829052604090912060010180546001600160a01b0319166001600160a01b03909216919091179055565b60008281526020819052604090205482906001600160a01b0316338114806104f257506001600160a01b038116600090815260016020908152604080832033845290915290205460ff165b6104fb57600080fd5b61050584846105ec565b837fd4735d920b0f87494915f556dd9b54c8f309026070caea5c737245152564d266846040516105359190610736565b60405180910390a250505050565b6000610550868686610279565b905061055d81848461061a565b505050505050565b3360008181526001602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6105db84846104a7565b6105e684838361061a565b50505050565b60009182526020829052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b6000838152602081905260409020600101546001600160a01b03838116911614610691576000838152602081905260409081902060010180546001600160a01b0319166001600160a01b03851617905551839060008051602061092083398151915290610688908590610736565b60405180910390a25b6000838152602081905260409020600101546001600160401b03828116600160a01b909204161461071857600083815260208190526040908190206001018054600160a01b600160e01b031916600160a01b6001600160401b038516021790555183906000805160206109408339815191529061070f9084906107de565b60405180910390a25b505050565b60006020828403121561072f57600080fd5b5035919050565b6001600160a01b0391909116815260200190565b80356001600160a01b038116811461076157600080fd5b919050565b60008060006060848603121561077b57600080fd5b83359250602084013591506107926040850161074a565b90509250925092565b80356001600160401b038116811461076157600080fd5b600080604083850312156107c557600080fd5b823591506107d56020840161079b565b90509250929050565b6001600160401b0391909116815260200190565b6000806040838503121561080557600080fd5b823591506107d56020840161074a565b600080600080600060a0868803121561082d57600080fd5b85359450602086013593506108446040870161074a565b92506108526060870161074a565b91506108606080870161079b565b90509295509295909350565b6000806040838503121561087f57600080fd5b6108888361074a565b91506020830135801515811461089d57600080fd5b809150509250929050565b600080600080608085870312156108be57600080fd5b843593506108ce6020860161074a565b92506108dc6040860161074a565b91506108ea6060860161079b565b905092959194509250565b6000806040838503121561090857600080fd5b6109118361074a565b91506107d56020840161074a56fe335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a01d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa68a264697066735822122083295b63a83536893871d8d72beb84bafddcce4806ee06c9d17afdea5de1a1da64736f6c63430008090033";

type ENSRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ENSRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ENSRegistry__factory extends ContractFactory {
  constructor(...args: ENSRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ENSRegistry> {
    return super.deploy(overrides || {}) as Promise<ENSRegistry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ENSRegistry {
    return super.attach(address) as ENSRegistry;
  }
  override connect(signer: Signer): ENSRegistry__factory {
    return super.connect(signer) as ENSRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ENSRegistryInterface {
    return new utils.Interface(_abi) as ENSRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ENSRegistry {
    return new Contract(address, _abi, signerOrProvider) as ENSRegistry;
  }
}