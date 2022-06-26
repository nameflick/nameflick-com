/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  OwnerPausable,
  OwnerPausableInterface,
} from "../../../../../@divergencetech/ethier/contracts/utils/OwnerPausable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
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
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001a3361002c565b6000805460ff60a01b1916905561007c565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6103e58061008b6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80633f4ba83a146100675780635c975abb14610071578063715018a61461008e5780638456cb59146100965780638da5cb5b1461009e578063f2fde38b146100b3575b600080fd5b61006f6100c6565b005b6100796100d8565b60405190151581526020015b60405180910390f35b61006f6100e8565b61006f6100fa565b6100a661010a565b604051610085919061036b565b61006f6100c136600461037f565b610119565b6100ce610197565b6100d66101f6565b565b600054600160a01b900460ff1690565b6100f0610197565b6100d66000610245565b610102610197565b6100d6610295565b6000546001600160a01b031690565b610121610197565b6001600160a01b03811661018b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b61019481610245565b50565b336101a061010a565b6001600160a01b0316146100d65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610182565b6101fe6102d8565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b60405161023b919061036b565b60405180910390a1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b61029d610323565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861022e3390565b6102e06100d8565b6100d65760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610182565b61032b6100d8565b156100d65760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610182565b6001600160a01b0391909116815260200190565b60006020828403121561039157600080fd5b81356001600160a01b03811681146103a857600080fd5b939250505056fea264697066735822122092f33ae56a0aca725d92370c85a3aa0faf8a4ad9021ed35202bac8679cf1cbdd64736f6c63430008090033";

type OwnerPausableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OwnerPausableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OwnerPausable__factory extends ContractFactory {
  constructor(...args: OwnerPausableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OwnerPausable> {
    return super.deploy(overrides || {}) as Promise<OwnerPausable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): OwnerPausable {
    return super.attach(address) as OwnerPausable;
  }
  override connect(signer: Signer): OwnerPausable__factory {
    return super.connect(signer) as OwnerPausable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OwnerPausableInterface {
    return new utils.Interface(_abi) as OwnerPausableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OwnerPausable {
    return new Contract(address, _abi, signerOrProvider) as OwnerPausable;
  }
}
