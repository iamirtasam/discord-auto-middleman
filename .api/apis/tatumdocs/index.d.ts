import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * <p style="display: none">/v3/avalanche/wallet</p>
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can
     * generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A
     * mnemonic phrase consists of 24 special words in a defined order and can restore access
     * to all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value which should never be
     * revealed</li><li>Public Key - a public address to be published</li><li>Derivation index
     * - an index of generated address</li></ul></p><p>Tatum follows the BIP44 specification
     * and generates for Avalanche wallets with the derivation path m/44'/60'/0'/0. More about
     * BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generates a BIP44 compatible Avalanche wallet.</p>
     *
     *
     * @summary Generate Avalanche wallet
     * @throws FetchError<400, types.AvalancheGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.AvalancheGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AvalancheGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheGenerateWallet(metadata?: types.AvalancheGenerateWalletMetadataParam): Promise<FetchResponse<200, types.AvalancheGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/avalanche/address/{xpub}/{index}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates an Avalanche account deposit address from an Extended public key. The
     * deposit address is generated for the specific index - each extended public key can
     * generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Avalanche account address from Extended public key
     * @throws FetchError<400, types.AvalancheGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.AvalancheGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AvalancheGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheGenerateAddress(metadata: types.AvalancheGenerateAddressMetadataParam): Promise<FetchResponse<200, types.AvalancheGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/avalanche/wallet/priv</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates the private key of an address from a mnemonic for a given derivation path
     * index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Avalanche private key
     * @throws FetchError<400, types.AvalancheGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.AvalancheGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AvalancheGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheGenerateAddressPrivateKey(body: types.AvalancheGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.AvalancheGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/avalanche/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based web3 driver to connect directly to the
     * Avalanche node provided by Tatum.
     * To learn more about Avalanche Web3, visit the <a href="https://avalanche.network/"
     * target="_blank">Avalanche developers' guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.AvalancheWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.AvalancheWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AvalancheWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheWeb3Driver(body: types.AvalancheWeb3DriverBodyParam, metadata: types.AvalancheWeb3DriverMetadataParam): Promise<FetchResponse<200, types.AvalancheWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/avalanche/block/current</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets the current Avalanche block number. This is
     * the number of the latest block in the blockchain.</p>
     *
     * @summary Get current block number
     * @throws FetchError<401, types.AvalancheGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AvalancheGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheGetCurrentBlock(): Promise<FetchResponse<200, types.AvalancheGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/avalanche/block/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets an Avalanche block-by-block hash or block
     * number.</p>
     *
     * @summary Get Avalanche block by hash
     * @throws FetchError<400, types.AvalancheGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.AvalancheGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AvalancheGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheGetBlock(metadata: types.AvalancheGetBlockMetadataParam): Promise<FetchResponse<200, types.AvalancheGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/avalanche/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of <b>AVAX</b> of an Avalanche account.</p>
     * <p>To get the balance of <b>tokens</b>, use the APIs for getting the balance of <a
     * href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20GetBalanceAddress"
     * target="_blank">fungible tokens (ERC-20)</a> and <a
     * href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetTokensByAddressErc721"
     * target="_blank">NFTs (ERC-721)</a>.</p>
     *
     *
     * @summary Get the AVAX balance of an Avalanche account
     * @throws FetchError<400, types.AvalancheGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.AvalancheGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AvalancheGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheGetBalance(metadata: types.AvalancheGetBalanceMetadataParam): Promise<FetchResponse<200, types.AvalancheGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/avalanche/transaction/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Avalanche transaction by transaction hash.</p>
     *
     *
     * @summary Get Avalanche Transaction
     * @throws FetchError<400, types.AvalancheGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.AvalancheGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.AvalancheGetTransactionResponse404> Transaction not found.
     * @throws FetchError<500, types.AvalancheGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheGetTransaction(metadata: types.AvalancheGetTransactionMetadataParam): Promise<FetchResponse<200, types.AvalancheGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/avalanche/transaction/count/{address}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Avalanche transactions for the address. When a transaction
     * is sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Avalanche transactions
     * @throws FetchError<400, types.AvalancheGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.AvalancheGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AvalancheGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheGetTransactionCount(metadata: types.AvalancheGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.AvalancheGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/avalanche/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send AVAX or Tatum-supported fungible tokens (ERC-20) from account to account.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> Sending the fungible tokens is
     * supported only on the mainnet.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending AVAX, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send AVAX or fungible tokens (ERC-20) from account to account
     * @throws FetchError<400, types.AvalancheBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.AvalancheBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AvalancheBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.AvalancheBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheBlockchainTransfer(body: types.AvalancheBlockchainTransferBodyParam): Promise<FetchResponse<200, types.AvalancheBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/avalanche/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Avalanche.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>If <b>caller</b> field is present instead of the private key, Tatum will sign the
     * transaction with the managed private key connected to the caller address. This is
     * applicable only for paid mainnet plans and all testnet plans. Keep in mind that the
     * caller address must have enough access right to perform the action in the smart contract
     * method.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Invoke a method in a smart contract on Avalanche
     * @throws FetchError<400, types.AvalancheBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.AvalancheBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AvalancheBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.AvalancheBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheBlockchainSmartContractInvocation(body: types.AvalancheBlockchainSmartContractInvocationBodyParam): Promise<FetchResponse<200, types.AvalancheBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/avalanche/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Avalanche blockchain. This method is used internally
     * from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed Avalanche transaction
     * @throws FetchError<400, types.AvalancheBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.AvalancheBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AvalancheBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.AvalancheBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    avalancheBroadcast(body: types.AvalancheBroadcastBodyParam): Promise<FetchResponse<200, types.AvalancheBroadcastResponse200>>;
    /**
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports Algorand wallets.</p>
     *
     *
     * @summary Generate Algorand wallet
     * @throws FetchError<400, types.AlgorandGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.AlgorandGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgorandGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algorandGenerateWallet(metadata?: types.AlgorandGenerateWalletMetadataParam): Promise<FetchResponse<200, types.AlgorandGenerateWalletResponse200>>;
    /**
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate Algorand account deposit address from private key.</p>
     *
     *
     * @summary Generate Algorand account address from private key
     * @throws FetchError<400, types.AlgorandGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.AlgorandGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgorandGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algorandGenerateAddress(metadata: types.AlgorandGenerateAddressMetadataParam): Promise<FetchResponse<200, types.AlgorandGenerateAddressResponse200>>;
    /**
     * <p><b>1 credit per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based url to connect directly to the Algorand node
     * provided by Tatum.
     * You can check all available APIs here - <a
     * href="https://developer.algorand.org/docs/rest-apis/indexer/"
     * target="_blank">https://developer.algorand.org/docs/rest-apis/indexer/</a>.
     * <br/>
     * Example call for Get Tx By ID is described in the response. <a
     * href="https://developer.algorand.org/docs/rest-apis/indexer/#get-v2transactionstxid"
     * target="_blank">https://developer.algorand.org/docs/rest-apis/indexer/#get-v2transactionstxid</a>.
     * <br/>
     * URL used for this call would be
     * <pre>https://api.tatum.io/v3/algorand/node/indexer/YOUR_API_KEY/v2/transactions/HNIQ76UTJYPOLZP5FWODYABBJPYPGJNEM2QEJSMDMQRWEKHEYJHQ</pre></p>
     *
     *
     * @summary Access Algorand Indexer GET node endpoints
     * @throws FetchError<400, types.AlgoNodeIndexerGetDriverResponse400> Bad Request
     * @throws FetchError<401, types.AlgoNodeIndexerGetDriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgoNodeIndexerGetDriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algoNodeIndexerGetDriver(metadata: types.AlgoNodeIndexerGetDriverMetadataParam): Promise<FetchResponse<200, types.AlgoNodeIndexerGetDriverResponse200>>;
    /**
     * <p><b>1 credit per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based url to connect directly to the Algorand node
     * provided by Tatum.
     * You can check al available APIs here - <a
     * href="https://developer.algorand.org/docs/rest-apis/algod/v2/"
     * target="_blank">https://developer.algorand.org/docs/rest-apis/algod/v2/</a>.
     * <br/>
     * Example call for Get Block is described in the response. <a
     * href="https://developer.algorand.org/docs/rest-apis/algod/v2/#get-v2blocksround"
     * target="_blank">https://developer.algorand.org/docs/rest-apis/algod/v2/#get-v2blocksround</a>.
     * <br/>
     * URL used for this call would be
     * <pre>https://api.tatum.io/v3/algorand/node/algod/YOUR_API_KEY/v2/blocks/16775567</pre>
     * </p>
     *
     *
     * @summary Access Algorand Algod GET node endpoints
     * @throws FetchError<400, types.AlgoNodeGetDriverResponse400> Bad Request
     * @throws FetchError<401, types.AlgoNodeGetDriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgoNodeGetDriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algoNodeGetDriver(metadata: types.AlgoNodeGetDriverMetadataParam): Promise<FetchResponse<200, types.AlgoNodeGetDriverResponse200>>;
    /**
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based url to connect directly to the Algorand node
     * provided by Tatum.
     *  You can check al available APIs here - <a
     * href="https://developer.algorand.org/docs/rest-apis/algod/v2/"
     * target="_blank">https://developer.algorand.org/docs/rest-apis/algod/v2/</a>.
     *  <br/>
     *  Example call for Broadcast a raw transaction is described in the response. <a
     * href="https://developer.algorand.org/docs/rest-apis/algod/v2/#post-v2transactions"
     * target="_blank">https://developer.algorand.org/docs/rest-apis/algod/v2/#post-v2transactions</a>.
     *  <br/>
     *  URL used for this call would be
     * <pre>https://api.tatum.io/v3/algorand/node/algod/YOUR_API_KEY/v2/transactions</pre>
     *  </p>
     *
     *
     * @summary Access Algorand Algod POST node endpoints
     * @throws FetchError<400, types.AlgoNodePostDriverResponse400> Bad Request
     * @throws FetchError<401, types.AlgoNodePostDriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgoNodePostDriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algoNodePostDriver(body: types.AlgoNodePostDriverBodyParam, metadata: types.AlgoNodePostDriverMetadataParam): Promise<FetchResponse<200, types.AlgoNodePostDriverResponse200>>;
    /**
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get Algorand account balance in ALGO.</p>
     *
     *
     * @summary Get Algorand Account balance
     * @throws FetchError<400, types.AlgorandGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.AlgorandGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgorandGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algorandGetBalance(metadata: types.AlgorandGetBalanceMetadataParam): Promise<FetchResponse<200, types.AlgorandGetBalanceResponse200>>;
    /**
     * <h4>1 credit per API call.</h4><br/><p>Get Algorand current block number. This is the
     * number of the latest block in the blockchain.</p>
     *
     * @summary Get current block number
     * @throws FetchError<401, types.AlgorandGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgorandGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algorandGetCurrentBlock(): Promise<FetchResponse<200, types.AlgorandGetCurrentBlockResponse200>>;
    /**
     * <h4>1 credit per API call.</h4><br/><p>Get Algorand block by block round number.</p>
     *
     * @summary Get Algorand block by block round number
     * @throws FetchError<400, types.AlgorandGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.AlgorandGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgorandGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algorandGetBlock(metadata: types.AlgorandGetBlockMetadataParam): Promise<FetchResponse<200, types.AlgorandGetBlockResponse200>>;
    /**
     * <p><b>2 credits per API call</b></p>
     * <p>Send Algos from one Algorand address to the other one.</p>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending Algos, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send Algos to an Algorand account
     * @throws FetchError<400, types.AlgorandBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.AlgorandBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgorandBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algorandBlockchainTransfer(body: types.AlgorandBlockchainTransferBodyParam): Promise<FetchResponse<200, types.AlgorandBlockchainTransferResponse200>>;
    /**
     * <h4>2 credits per API call.</h4><br/>
     * <p>Enable accepting Algorand asset on the sender account.<br/><br/>
     * This operation needs the private key of the blockchain address.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and loss of funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Enable receiving asset on account
     * @throws FetchError<400, types.AlgorandBlockchainReceiveAssetResponse400> Bad Request
     * @throws FetchError<401, types.AlgorandBlockchainReceiveAssetResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgorandBlockchainReceiveAssetResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algorandBlockchainReceiveAsset(body: types.AlgorandBlockchainReceiveAssetBodyParam): Promise<FetchResponse<200, types.AlgorandBlockchainReceiveAssetResponse200>>;
    /**
     * <h4>1 credit per API call.</h4><br/><p>Get Algorand transaction by transaction id.</p>
     *
     * @summary Get Algorand Transaction
     * @throws FetchError<400, types.AlgorandGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.AlgorandGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgorandGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algorandGetTransaction(metadata: types.AlgorandGetTransactionMetadataParam): Promise<FetchResponse<200, types.AlgorandGetTransactionResponse200>>;
    /**
     * <p><b>1 credit per API call</b></p>
     * <p><b>This endpoint is deprecated.</b></p><br/>
     * <p>Get Algorand transaction by specified period of time.</p>
     *
     *
     * @summary Get Algorand Transactions between from and to
     * @throws FetchError<400, types.AlgorandGetPayTransactionsByFromToResponse400> Bad Request
     * @throws FetchError<401, types.AlgorandGetPayTransactionsByFromToResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgorandGetPayTransactionsByFromToResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algorandGetPayTransactionsByFromTo(metadata: types.AlgorandGetPayTransactionsByFromToMetadataParam): Promise<FetchResponse<200, types.AlgorandGetPayTransactionsByFromToResponse200>>;
    /**
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Algorand blockchain. This method is used internally
     * from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed Algorand transaction
     * @throws FetchError<400, types.AlgorandBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.AlgorandBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.AlgorandBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    algorandBroadcast(body: types.AlgorandBroadcastBodyParam): Promise<FetchResponse<200, types.AlgorandBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/wallet</p>
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very
     * convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase.
     * Mnemonic phrase consists of 24 special words in defined order and can restore access to
     * all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value, which should never be
     * revealed</li><li>Public Key - public address to be published</li><li>Derivation index -
     * index of generated address</li></ul></p><p>Tatum follows BIP44 specification and
     * generates for Dogecoin wallet with derivation path m'/44'/3'/0'/0. More about BIP44 HD
     * wallets can be found here - <a target="_blank"
     * href="https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki">https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Dogecoin wallet.</p>
     *
     *
     * @summary Generate Dogecoin wallet
     * @throws FetchError<400, types.DogeGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.DogeGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeGenerateWalletResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGenerateWallet(metadata?: types.DogeGenerateWalletMetadataParam): Promise<FetchResponse<200, types.DogeGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/address/{xpub}/{index}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate Dogecoin deposit address from Extended public key. Deposit address is
     * generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Dogecoin deposit address from Extended public key
     * @throws FetchError<400, types.DogeGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.DogeGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeGenerateAddressResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGenerateAddress(metadata: types.DogeGenerateAddressMetadataParam): Promise<FetchResponse<200, types.DogeGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/wallet/priv</p>
     * <h4>2 credits per API call.</h4><br/>
     * <p>Generate private key for address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Dogecoin private key
     * @throws FetchError<400, types.DogeGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.DogeGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeGenerateAddressPrivateKeyResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGenerateAddressPrivateKey(body: types.DogeGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.DogeGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/node</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based JSON RPC driver to connect directly to the
     * node provided by Tatum.</p>
     *
     *
     * @summary JSON RPC HTTP driver
     * @throws FetchError<400, types.DogeRpcDriverResponse400> Bad Request
     * @throws FetchError<401, types.DogeRpcDriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.DogeRpcDriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeRpcDriver(body: types.DogeRpcDriverBodyParam): Promise<FetchResponse<200, types.DogeRpcDriverResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/info</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Dogecoin Blockchain Information. Obtain basic
     * info like testnet / mainnet version of the chain, current block number and it's
     * hash.</p>
     *
     * @summary Get Dogecoin Blockchain Information
     * @throws FetchError<401, types.DogeGetBlockChainInfoResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeGetBlockChainInfoResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeGetBlockChainInfoResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGetBlockChainInfo(): Promise<FetchResponse<200, types.DogeGetBlockChainInfoResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/block/hash/{i}</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Dogecoin Block hash. Returns hash of the
     * block to get the block detail.</p>
     *
     * @summary Get Dogecoin Block hash
     * @throws FetchError<400, types.DogeGetBlockHashResponse400> Bad Request
     * @throws FetchError<401, types.DogeGetBlockHashResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeGetBlockHashResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeGetBlockHashResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGetBlockHash(metadata: types.DogeGetBlockHashMetadataParam): Promise<FetchResponse<200, types.DogeGetBlockHashResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/block/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Dogecoin Block detail by block hash or
     * height.</p>
     *
     * @summary Get Dogecoin Block by hash or height
     * @throws FetchError<400, types.DogeGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.DogeGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.DogeGetBlockResponse404> Block not found.
     * @throws FetchError<500, types.DogeGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGetBlock(metadata: types.DogeGetBlockMetadataParam): Promise<FetchResponse<200, types.DogeGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/transaction/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Dogecoin Transaction detail by transaction
     * hash.</p>
     *
     * @summary Get Dogecoin Transaction by hash
     * @throws FetchError<400, types.DogeGetRawTransactionResponse400> Bad Request
     * @throws FetchError<401, types.DogeGetRawTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeGetRawTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeGetRawTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGetRawTransaction(metadata: types.DogeGetRawTransactionMetadataParam): Promise<FetchResponse<200, types.DogeGetRawTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/transaction/address/{address}</p>
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Dogecoin Transaction by address.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/doge-example/src/app/doge.blockchain.example.ts"
     * target="_blank">Tatum Dogecoin SDK</a>.'
     *
     *
     * @summary Get Dogecoin Transactions by address
     * @throws FetchError<400, types.DogeGetTxByAddressResponse400> Bad Request
     * @throws FetchError<401, types.DogeGetTxByAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeGetTxByAddressResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeGetTxByAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGetTxByAddress(metadata: types.DogeGetTxByAddressMetadataParam): Promise<FetchResponse<200, types.DogeGetTxByAddressResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/address/balance/{address}</p>
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Dogecoin Balance of the address.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/doge-example/src/app/doge.blockchain.example.ts"
     * target="_blank">Tatum Dogecoin SDK</a>.'
     *
     *
     * @summary Get the balance of a Dogecoin address
     * @throws FetchError<400, types.DogeGetBalanceOfAddressResponse400> Bad Request
     * @throws FetchError<401, types.DogeGetBalanceOfAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeGetBalanceOfAddressResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeGetBalanceOfAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGetBalanceOfAddress(metadata: types.DogeGetBalanceOfAddressMetadataParam): Promise<FetchResponse<200, types.DogeGetBalanceOfAddressResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/address/balance/batch</p>
     * <p><b>50 credits per API call</b></p>
     * <p>Get the balance of multiple Dogecoin addresses, up to 30.</p>
     * <p>The API returns the balance only if the address has up to 50,000 UTXOs (Unspent
     * Transaction Outputs). For an address with more than 50,000 UTXOs, the API returns an
     * error with the <code>403</code> response code.</p>
     *
     *
     * @summary Get the balance of multiple Dogecoin addresses
     * @throws FetchError<400, types.DogeGetBalanceOfAddressBatchResponse400> Bad Request
     * @throws FetchError<401, types.DogeGetBalanceOfAddressBatchResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeGetBalanceOfAddressBatchResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.DogeGetBalanceOfAddressBatchResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGetBalanceOfAddressBatch(metadata: types.DogeGetBalanceOfAddressBatchMetadataParam): Promise<FetchResponse<200, types.DogeGetBalanceOfAddressBatchResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/mempool</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Dogecoin Transaction ids in the mempool.</p>
     *
     * @summary Get Mempool Transactions
     * @throws FetchError<400, types.DogeGetMempoolResponse400> Bad Request
     * @throws FetchError<401, types.DogeGetMempoolResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeGetMempoolResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeGetMempoolResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGetMempool(): Promise<FetchResponse<200, types.DogeGetMempoolResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/utxo/{hash}/{index}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get information about a transaction output in a transaction and check whether this
     * output is a UTXO or has been spent.</p>
     * <p>"UTXO" stands for "Unspent Transaction Output". A UTXO is the amount of DOGE that
     * remains at a Dogecoin address after a cryptocurrency transaction involving this address
     * has been performed. The UTXO can then be used as input for a new cryptocurrency
     * transaction. For more information about the UTXO, see the <a
     * href="https://developer.bitcoin.org/devguide/transactions.html" target="_blank">Bitcoin
     * user documentation</a>.</p>
     * <ul>
     * <li>If the transaction output is an UTXO, the API returns data about it.</li>
     * <li>If the transaction output has been spent and there is no UTXO to return, the API
     * returns an error with the <code>404</code> response code.</li>
     * </ul>
     *
     *
     * @summary Get information about a transaction output (UTXO) in a Dogecoin transaction
     * @throws FetchError<400, types.DogeGetUtxoResponse400> Bad Request
     * @throws FetchError<401, types.DogeGetUtxoResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeGetUtxoResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeGetUtxoResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeGetUTXO(metadata: types.DogeGetUtxoMetadataParam): Promise<FetchResponse<200, types.DogeGetUtxoResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send DOGE to blockchain addresses.</p>
     * <p>Dogecoin transactions are based on UTXOs. "UTXO" stands for "Unspent Transaction
     * Output". A UTXO is the amount of DOGE that remains at a Bitcoin Cash address after a
     * cryptocurrency transaction involving this address has been performed. The UTXO can then
     * be used as input for a new cryptocurrency transaction. For more information the UTXO,
     * see the <a href="https://developer.bitcoin.org/devguide/transactions.html"
     * target="_blank">Bitcoin user documentation</a>. To check UTXOs in a transaction, see the
     * <a href="#operation/DogeGetUTXO">API for getting information about a transaction output
     * (UTXO) in a Dogecoin transaction</a></p>
     * <p>You build a DOGE transaction by sending DOGE from UTXOs. Each UTXO is included in the
     * transaction.</p>
     * <p>When an UTXO is entered into a transaction, the whole UTXO amount is included and
     * must be spent. For example, address A receives two transactions, T1 with 1 DOGE and T2
     * with 2 DOGE. A transaction that consumes the UTXOs from both T1 and T2 will have an
     * available amount of 3 DOGE to spend:<br/><code>1 DOGE (from T1) + 2 DOGE (from T2) = 3
     * DOGE (to spend in total)</code></p>
     * <p>You can send the assets to one or multiple recipients in one transaction. If you send
     * the assets to multiple addresses, each address must have its own amount to receive.</p>
     * <p><b>Paying the gas fee and receiving the change</b><br/>
     * When the amount that the recipients should receive is lower than the amount from the
     * UTXOs, the difference between these two amounts is by default used as the gas fee for
     * the transaction. Because this amount may be considerable and you may not want to spend
     * it all on the gas fee, you can explicitly specify the fee amount and the blockchain
     * address where any extra funds remaining after covering the fee will be sent (the
     * <code>fee</code> and <code>changeAddress</code> parameters in the request body,
     * correspondingly).</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending DOGE, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send DOGE to Dogecoin addresses
     * @throws FetchError<400, types.DogeTransferBlockchainResponse400> Bad Request
     * @throws FetchError<401, types.DogeTransferBlockchainResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeTransferBlockchainResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeTransferBlockchainResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeTransferBlockchain(body: types.DogeTransferBlockchainBodyParam): Promise<FetchResponse<200, types.DogeTransferBlockchainResponse200>>;
    /**
     * <p style="display: none">/v3/dogecoin/broadcast</p>
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Dogecoin blockchain. This method is used internally
     * from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed Dogecoin transaction
     * @throws FetchError<400, types.DogeBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.DogeBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.DogeBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.DogeBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    dogeBroadcast(body: types.DogeBroadcastBodyParam): Promise<FetchResponse<200, types.DogeBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/wallet</p>
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can
     * generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A
     * mnemonic phrase consists of 24 special words in a defined order and can restore access
     * to all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value which should never be
     * revealed</li><li>Public Key - a public address to be published</li><li>Derivation index
     * - an index of generated address</li></ul></p><p>Tatum follows the BIP44 specification
     * and generates for Ethereum wallets with the derivation path m/44'/60'/0'/0. More about
     * BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generates a BIP44 compatible Ethereum wallet.</p>
     *
     *
     * @summary Generate Ethereum wallet
     * @throws FetchError<400, types.EthGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.EthGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EthGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethGenerateWallet(metadata?: types.EthGenerateWalletMetadataParam): Promise<FetchResponse<200, types.EthGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/address/{xpub}/{index}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates an Ethereum account deposit address from an Extended public key. The
     * deposit address is generated for the specific index - each extended public key can
     * generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Ethereum account address from Extended public key
     * @throws FetchError<400, types.EthGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.EthGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EthGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethGenerateAddress(metadata: types.EthGenerateAddressMetadataParam): Promise<FetchResponse<200, types.EthGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/wallet/priv</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates the private key of an address from a mnemonic for a given derivation path
     * index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Ethereum private key
     * @throws FetchError<400, types.EthGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.EthGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EthGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethGenerateAddressPrivateKey(body: types.EthGenerateAddressPrivateKeyBodyParam, metadata?: types.EthGenerateAddressPrivateKeyMetadataParam): Promise<FetchResponse<200, types.EthGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based web3 driver to connect directly to the
     * Ethereum node provided by Tatum.
     * To learn more about Ethereum Web3, visit the <a
     * href="https://ethereum.org/en/developers/" target="_blank">Ethereum developers'
     * guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.EthWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.EthWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EthWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethWeb3Driver(body: types.EthWeb3DriverBodyParam, metadata: types.EthWeb3DriverMetadataParam): Promise<FetchResponse<200, types.EthWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/block/current</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets the current Ethereum block number. This is
     * the number of the latest block in the blockchain.</p>
     *
     * @summary Get current block number
     * @throws FetchError<401, types.EthGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EthGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethGetCurrentBlock(metadata?: types.EthGetCurrentBlockMetadataParam): Promise<FetchResponse<200, types.EthGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/block/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets an Ethereum block-by-block hash or block
     * number.</p>
     *
     * @summary Get Ethereum block by hash
     * @throws FetchError<400, types.EthGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.EthGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EthGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethGetBlock(metadata: types.EthGetBlockMetadataParam): Promise<FetchResponse<200, types.EthGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of <b>ETH</b> of an Ethereum account.</p>
     * <p>To get the balance of <b>tokens</b>, use the APIs for getting the balance of <a
     * href="https://docs.tatum.io/reference/erc20getbalanceaddress" target="_blank">fungible
     * tokens (ERC-20)</a> and <a
     * href="https://docs.tatum.io/reference/nftgettokensbyaddresserc721" target="_blank">NFTs
     * (ERC-721)</a>.</p>
     *
     *
     * @summary Get the ETH balance of an Ethereum account
     * @throws FetchError<400, types.EthGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.EthGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EthGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethGetBalance(metadata: types.EthGetBalanceMetadataParam): Promise<FetchResponse<200, types.EthGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/transaction/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Ethereum transaction by transaction hash.</p>
     *
     *
     * @summary Get Ethereum Transaction
     * @throws FetchError<400, types.EthGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.EthGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.EthGetTransactionResponse404> Transaction not found.
     * @throws FetchError<500, types.EthGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethGetTransaction(metadata: types.EthGetTransactionMetadataParam): Promise<FetchResponse<200, types.EthGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/transaction/count/{address}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Ethereum transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Ethereum transactions
     * @throws FetchError<400, types.EthGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.EthGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EthGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethGetTransactionCount(metadata: types.EthGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.EthGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/account/transaction/{address}</p>
     * <p>This endpoint is deprecated. Do not use it.</p>
     * <p><h4>1 credit per API call.</h4></p>
     * <p>Get Ethereum transactions by address. This includes incoming and outgoing
     * transactions for the address.</p>
     *
     *
     * @summary Get Ethereum transactions by address
     * @throws FetchError<400, types.EthGetTransactionByAddressResponse400> Bad Request
     * @throws FetchError<401, types.EthGetTransactionByAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EthGetTransactionByAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethGetTransactionByAddress(metadata: types.EthGetTransactionByAddressMetadataParam): Promise<FetchResponse<200, types.EthGetTransactionByAddressResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send ETH or Tatum-supported fungible tokens (ERC-20) from account to account.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> Sending the fungible tokens is
     * supported only on the mainnet.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending ETH, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send ETH or fungible tokens (ERC-20) from account to account
     * @throws FetchError<400, types.EthBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.EthBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.EthBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.EthBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethBlockchainTransfer(body: types.EthBlockchainTransferBodyParam, metadata?: types.EthBlockchainTransferMetadataParam): Promise<FetchResponse<200, types.EthBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Ethereum.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>If <b>caller</b> field is present instead of the private key, Tatum will sign the
     * transaction with the managed private key connected to the caller address. This is
     * applicable only for paid mainnet plans and all testnet plans. Keep in mind that the
     * caller address must have enough access right to perform the action in the smart contract
     * method.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Invoke a method in a smart contract on Ethereum
     * @throws FetchError<400, types.EthBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.EthBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.EthBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.EthBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethBlockchainSmartContractInvocation(body: types.EthBlockchainSmartContractInvocationBodyParam, metadata?: types.EthBlockchainSmartContractInvocationMetadataParam): Promise<FetchResponse<200, types.EthBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/account/transaction/internal/{address}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get Ethereum internal transactions by address.<br/></p>
     *
     *
     * @summary Get Ethereum internal transactions by address
     * @throws FetchError<400, types.EthGetInternalTransactionByAddressResponse400> Bad Request
     * @throws FetchError<401, types.EthGetInternalTransactionByAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EthGetInternalTransactionByAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethGetInternalTransactionByAddress(metadata: types.EthGetInternalTransactionByAddressMetadataParam): Promise<FetchResponse<200, types.EthGetInternalTransactionByAddressResponse200>>;
    /**
     * <p style="display: none">/v3/ethereum/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Ethereum blockchain. This method is used internally
     * from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed Ethereum transaction
     * @throws FetchError<400, types.EthBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.EthBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.EthBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.EthBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ethBroadcast(body: types.EthBroadcastBodyParam, metadata?: types.EthBroadcastMetadataParam): Promise<FetchResponse<200, types.EthBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/wallet</p>
     * <h4>5 credits per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very
     * convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase.
     * Mnemonic phrase consists of 24 special words in defined order and can restore access to
     * all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value, which should never be
     * revealed</li><li>Public Key - public address to be published</li><li>Derivation index -
     * index of generated address</li></ul></p><p>Tatum follows BIP44 specification and
     * generates for Litecoin wallet with derivation path m'/44'/2'/0'/0. More about BIP44 HD
     * wallets can be found here - <a target="_blank"
     * href="https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki">https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Litecoin wallet.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.wallet.example.ts"
     * target="_blank">Tatum LTC SDK</a>.
     *
     *
     * @summary Generate Litecoin wallet
     * @throws FetchError<400, types.LtcGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.LtcGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcGenerateWalletResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGenerateWallet(metadata?: types.LtcGenerateWalletMetadataParam): Promise<FetchResponse<200, types.LtcGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/node</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based JSON RPC driver to connect directly to the
     * node provided by Tatum.</p>
     *
     *
     * @summary JSON RPC HTTP driver
     * @throws FetchError<400, types.LtcRpcDriverResponse400> Bad Request
     * @throws FetchError<401, types.LtcRpcDriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.LtcRpcDriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcRpcDriver(body: types.LtcRpcDriverBodyParam): Promise<FetchResponse<200, types.LtcRpcDriverResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/info</p>
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Litecoin Blockchain Information. Obtain basic info like testnet / mainnet
     * version of the chain, current block number and it's hash.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts"
     * target="_blank">Tatum LTC SDK</a>.
     *
     *
     * @summary Get Litecoin Blockchain Information
     * @throws FetchError<401, types.LtcGetBlockChainInfoResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcGetBlockChainInfoResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcGetBlockChainInfoResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGetBlockChainInfo(): Promise<FetchResponse<200, types.LtcGetBlockChainInfoResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/block/hash/{i}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get Litecoin Block hash. Returns hash of the
     * block to get the block detail.</p><br />Examples of using this endpoint with the Tatum
     * JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts"
     * target="_blank">Tatum LTC SDK</a>.
     *
     * @summary Get Litecoin Block hash
     * @throws FetchError<400, types.LtcGetBlockHashResponse400> Bad Request
     * @throws FetchError<401, types.LtcGetBlockHashResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcGetBlockHashResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcGetBlockHashResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGetBlockHash(metadata: types.LtcGetBlockHashMetadataParam): Promise<FetchResponse<200, types.LtcGetBlockHashResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/block/{hash}</p>
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Litecoin Block detail by block hash or height.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts"
     * target="_blank">Tatum LTC SDK</a>.
     *
     *
     * @summary Get Litecoin Block by hash or height
     * @throws FetchError<400, types.LtcGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.LtcGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.LtcGetBlockResponse404> Block not found.
     * @throws FetchError<500, types.LtcGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGetBlock(metadata: types.LtcGetBlockMetadataParam): Promise<FetchResponse<200, types.LtcGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/transaction/{hash}</p>
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Litecoin Transaction detail by transaction hash.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts"
     * target="_blank">Tatum LTC SDK</a>.'
     *
     *
     * @summary Get Litecoin Transaction by hash
     * @throws FetchError<400, types.LtcGetRawTransactionResponse400> Bad Request
     * @throws FetchError<401, types.LtcGetRawTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcGetRawTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcGetRawTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGetRawTransaction(metadata: types.LtcGetRawTransactionMetadataParam): Promise<FetchResponse<200, types.LtcGetRawTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/mempool</p>
     * <h4>1 credit per API call.</h4>
     * <br/><p>Get Litecoin Transaction ids in the mempool.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts"
     * target="_blank">Tatum LTC SDK</a>.'
     *
     *
     * @summary Get Mempool Transactions
     * @throws FetchError<400, types.LtcGetMempoolResponse400> Bad Request
     * @throws FetchError<401, types.LtcGetMempoolResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcGetMempoolResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcGetMempoolResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGetMempool(): Promise<FetchResponse<200, types.LtcGetMempoolResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/transaction/address/{address}</p>
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Litecoin Transaction by address.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts"
     * target="_blank">Tatum LTC SDK</a>.'
     *
     *
     * @summary Get Litecoin Transactions by address
     * @throws FetchError<400, types.LtcGetTxByAddressResponse400> Bad Request
     * @throws FetchError<401, types.LtcGetTxByAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcGetTxByAddressResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcGetTxByAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGetTxByAddress(metadata: types.LtcGetTxByAddressMetadataParam): Promise<FetchResponse<200, types.LtcGetTxByAddressResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/address/balance/{address}</p>
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Litecoin Balance of the address.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts"
     * target="_blank">Tatum LTC SDK</a>.'
     *
     *
     * @summary Get the balance of a Litecoin address
     * @throws FetchError<400, types.LtcGetBalanceOfAddressResponse400> Bad Request
     * @throws FetchError<401, types.LtcGetBalanceOfAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcGetBalanceOfAddressResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcGetBalanceOfAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGetBalanceOfAddress(metadata: types.LtcGetBalanceOfAddressMetadataParam): Promise<FetchResponse<200, types.LtcGetBalanceOfAddressResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/address/balance/batch</p>
     * <p><b>50 credits per API call</b></p>
     * <p>Get the balance of multiple Litecoin addresses, up to 30.</p>
     * <p>The API returns the balance only if the address has up to 50,000 UTXOs (Unspent
     * Transaction Outputs). For an address with more than 50,000 UTXOs, the API returns an
     * error with the <code>403</code> response code.</p>
     *
     *
     * @summary Get the balance of multiple Litecoin addresses
     * @throws FetchError<400, types.LtcGetBalanceOfAddressBatchResponse400> Bad Request
     * @throws FetchError<401, types.LtcGetBalanceOfAddressBatchResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcGetBalanceOfAddressBatchResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.LtcGetBalanceOfAddressBatchResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGetBalanceOfAddressBatch(metadata: types.LtcGetBalanceOfAddressBatchMetadataParam): Promise<FetchResponse<200, types.LtcGetBalanceOfAddressBatchResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/utxo/{hash}/{index}</p>
     * <p><b>5 credits per API call</b></p>
     * <p>Get information about a transaction output in a transaction and check whether this
     * output is a UTXO or has been spent.</p>
     * <p>"UTXO" stands for "Unspent Transaction Output". A UTXO is the amount of LTC that
     * remains at a Litecoin address after a cryptocurrency transaction involving this address
     * has been performed. The UTXO can then be used as input for a new cryptocurrency
     * transaction. For more information the UTXO, see the <a
     * href="https://developer.bitcoin.org/devguide/transactions.html" target="_blank">Bitcoin
     * user documentation</a>.</p>
     * <ul>
     * <li>If the transaction output is an UTXO, the API returns data about it.</li>
     * <li>If the transaction output has been spent and there is no UTXO to return, the API
     * returns an error with the <code>404</code> response code.</li>
     * </ul>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts"
     * target="_blank">Tatum LTC SDK</a>.
     *
     *
     * @summary Get information about a transaction output (UTXO) in a Litecoin transaction
     * @throws FetchError<400, types.LtcGetUtxoResponse400> Bad Request
     * @throws FetchError<401, types.LtcGetUtxoResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcGetUtxoResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcGetUtxoResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGetUTXO(metadata: types.LtcGetUtxoMetadataParam): Promise<FetchResponse<200, types.LtcGetUtxoResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/address/{xpub}/{index}</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate Litecoin deposit address from Extended public key. Deposit address is
     * generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.wallet.example.ts"
     * target="_blank">Tatum LTC SDK</a>.
     *
     *
     * @summary Generate Litecoin deposit address from Extended public key
     * @throws FetchError<400, types.LtcGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.LtcGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcGenerateAddressResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGenerateAddress(metadata: types.LtcGenerateAddressMetadataParam): Promise<FetchResponse<200, types.LtcGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/wallet/priv</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate private key for address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.wallet.example.ts"
     * target="_blank">Tatum LTC SDK</a>.
     *
     *
     * @summary Generate Litecoin private key
     * @throws FetchError<400, types.LtcGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.LtcGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcGenerateAddressPrivateKeyResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcGenerateAddressPrivateKey(body: types.LtcGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.LtcGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/transaction</p>
     * <p><b>10 credits per API call</b></p>
     * <p>Send LTC to blockchain addresses.</p>
     * <p>Litecoin transactions are based on UTXOs. "UTXO" stands for "Unspent Transaction
     * Output". A UTXO is the amount of LTC that remains at a Litecoin address after a
     * cryptocurrency transaction involving this address has been performed. The UTXO can then
     * be used as input for a new cryptocurrency transaction. For more information about the
     * UTXO, see the <a href="https://developer.bitcoin.org/devguide/transactions.html"
     * target="_blank">Bitcoin user documentation</a>. To check UTXOs in a transaction, see the
     * <a href="#operation/LtcGetUTXO">API for getting information about a transaction output
     * (UTXO) in a Litecoin transaction</a>.</p>
     * <p>You can build a LTC transaction by one of the following methods:</p>
     * <ul>
     * <li><b>Sending LTC from blockchain addresses</b><br/>The assets are sent from a list of
     * addresses. For each address, the last 100 transactions are scanned for any UTXO to be
     * included in the transaction. For easier control over the assets to be sent, we recommend
     * that you use this method only if you have one address to send the assets from.<br/> To
     * use this method, use the <code>LtcTransactionAddress</code> or
     * <code>LtcTransactionAddressKMS</code> schema of the request body.</li>
     * <li><b>Sending LTC from UTXOs</b><br/>The assets are sent from a list of UTXOs. Each
     * UTXO is included in the transaction. Use this method if you want to manually calculate
     * the amount to send.<br/> To use this method, use the <code>LtcTransactionFromUTXO</code>
     * or <code>LtcTransactionFromUTXOKMS</code> schema of the request body.</li>
     * </ul>
     * <p>When an UTXO is entered into a transaction, the whole UTXO amount is included and
     * must be spent. For example, address A receives two transactions, T1 with 1 LTC and T2
     * with 2 LTC. A transaction that consumes the UTXOs from both T1 and T2 will have an
     * available amount of 3 LTC to spend:<br/><code>1 LTC (from T1) + 2 LTC (from T2) = 3 LTC
     * (to spend in total)</code></p>
     * <p>You can send the assets to one or multiple recipients in one transaction. If you send
     * the assets to multiple addresses, each address must have its own amount to receive.</p>
     * <p><b>Paying the gas fee and receiving the change</b><br/>
     * When the amount that the recipients should receive is lower than the amount from the
     * UTXOs, the difference between these two amounts is by default used as the gas fee for
     * the transaction. Because this amount may be considerable and you may not want to spend
     * it all on the gas fee, you can explicitly specify the fee amount and the blockchain
     * address where any extra funds remaining after covering the fee will be sent (the
     * <code>fee</code> and <code>changeAddress</code> parameters in the request body,
     * correspondingly).</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending LTC, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts"
     * target="_blank">Tatum LTC SDK</a>.
     *
     *
     * @summary Send LTC to Litecoin addresses
     * @throws FetchError<400, types.LtcTransferBlockchainResponse400> Bad Request
     * @throws FetchError<401, types.LtcTransferBlockchainResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcTransferBlockchainResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcTransferBlockchainResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcTransferBlockchain(body: types.LtcTransferBlockchainBodyParam): Promise<FetchResponse<200, types.LtcTransferBlockchainResponse200>>;
    /**
     * <p style="display: none">/v3/litecoin/broadcast</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Litecoin blockchain. This method is used internally
     * from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a
     * href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts"
     * target="_blank">Tatum LTC SDK</a>.
     *
     *
     * @summary Broadcast signed Litecoin transaction
     * @throws FetchError<400, types.LtcBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.LtcBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.LtcBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.LtcBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    ltcBroadcast(body: types.LtcBroadcastBodyParam): Promise<FetchResponse<200, types.LtcBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/wallet</p>
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can
     * generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A
     * mnemonic phrase consists of 24 special words in a defined order and can restore access
     * to all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value which should never be
     * revealed</li><li>Public Key - a public address to be published</li><li>Derivation index
     * - an index of generated address</li></ul></p><p>Tatum follows the BIP44 specification
     * and generates for Optimism wallets with the derivation path m/44'/60'/0'/0. More about
     * BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generates a BIP44 compatible Optimism wallet.</p>
     *
     *
     * @summary Generate Optimism wallet
     * @throws FetchError<400, types.OptimismGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.OptimismGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OptimismGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismGenerateWallet(metadata?: types.OptimismGenerateWalletMetadataParam): Promise<FetchResponse<200, types.OptimismGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/address/{xpub}/{index}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates an Optimism account deposit address from an Extended public key. The
     * deposit address is generated for the specific index - each extended public key can
     * generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Optimism account address from Extended public key
     * @throws FetchError<400, types.OptimismGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.OptimismGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OptimismGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismGenerateAddress(metadata: types.OptimismGenerateAddressMetadataParam): Promise<FetchResponse<200, types.OptimismGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/wallet/priv</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates the private key of an address from a mnemonic for a given derivation path
     * index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Optimism private key
     * @throws FetchError<400, types.OptimismGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.OptimismGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OptimismGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismGenerateAddressPrivateKey(body: types.OptimismGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.OptimismGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based web3 driver to connect directly to the
     * Optimism node provided by Tatum.
     * To learn more about Optimism Web3, visit the <a href="https://optimism.network/"
     * target="_blank">Optimism developers' guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.OptimismWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.OptimismWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OptimismWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismWeb3Driver(body: types.OptimismWeb3DriverBodyParam, metadata: types.OptimismWeb3DriverMetadataParam): Promise<FetchResponse<200, types.OptimismWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/block/current</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets the current Optimism block number. This is
     * the number of the latest block in the blockchain.</p>
     *
     * @summary Get current block number
     * @throws FetchError<401, types.OptimismGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OptimismGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismGetCurrentBlock(): Promise<FetchResponse<200, types.OptimismGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/block/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets an Optimism block-by-block hash or block
     * number.</p>
     *
     * @summary Get Optimism block by hash
     * @throws FetchError<400, types.OptimismGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.OptimismGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OptimismGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismGetBlock(metadata: types.OptimismGetBlockMetadataParam): Promise<FetchResponse<200, types.OptimismGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of <b>OPTIMISM</b> of an Optimism account.</p>
     * <p>To get the balance of <b>tokens</b>, use the APIs for getting the balance of <a
     * href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20GetBalanceAddress"
     * target="_blank">fungible tokens (ERC-20)</a> and <a
     * href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetTokensByAddressErc721"
     * target="_blank">NFTs (ERC-721)</a>.</p>
     *
     *
     * @summary Get the OPTIMISM balance of an Optimism account
     * @throws FetchError<400, types.OptimismGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.OptimismGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OptimismGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismGetBalance(metadata: types.OptimismGetBalanceMetadataParam): Promise<FetchResponse<200, types.OptimismGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/transaction/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Optimism transaction by transaction hash.</p>
     *
     *
     * @summary Get Optimism Transaction
     * @throws FetchError<400, types.OptimismGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.OptimismGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.OptimismGetTransactionResponse404> Transaction not found.
     * @throws FetchError<500, types.OptimismGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismGetTransaction(metadata: types.OptimismGetTransactionMetadataParam): Promise<FetchResponse<200, types.OptimismGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/transaction/count/{address}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Optimism transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Optimism transactions
     * @throws FetchError<400, types.OptimismGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.OptimismGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OptimismGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismGetTransactionCount(metadata: types.OptimismGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.OptimismGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send OPTIMISM or Tatum-supported fungible tokens (ERC-20) from account to
     * account.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> Sending the fungible tokens is
     * supported only on the mainnet.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending OPTIMISM, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     *
     *
     * @summary Send OPTIMISM or fungible tokens (ERC-20) from account to account
     * @throws FetchError<400, types.OptimismBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.OptimismBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.OptimismBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.OptimismBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismBlockchainTransfer(body: types.OptimismBlockchainTransferBodyParam): Promise<FetchResponse<200, types.OptimismBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Optimism.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>If <b>caller</b> field is present instead of the private key, Tatum will sign the
     * transaction with the managed private key connected to the caller address. This is
     * applicable only for paid mainnet plans and all testnet plans. Keep in mind that the
     * caller address must have enough access right to perform the action in the smart contract
     * method.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     *
     *
     * @summary Invoke a method in a smart contract on Optimism
     * @throws FetchError<400, types.OptimismBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.OptimismBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.OptimismBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.OptimismBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismBlockchainSmartContractInvocation(body: types.OptimismBlockchainSmartContractInvocationBodyParam): Promise<FetchResponse<200, types.OptimismBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/optimism/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Optimism blockchain.</p>
     *
     *
     * @summary Broadcast signed Optimism transaction
     * @throws FetchError<400, types.OptimismBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.OptimismBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.OptimismBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.OptimismBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    optimismBroadcast(body: types.OptimismBroadcastBodyParam): Promise<FetchResponse<200, types.OptimismBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/wallet</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Tatum supports BIP44 HD wallets. Because they can generate 2^31 addresses from 1
     * mnemonic phrase, they are very convenient and secure. A mnemonic phrase consists of 24
     * special words in a defined order and can restore access to all generated addresses and
     * private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your
     * secret value, which should never be revealed</li><li>Public Key - public address to be
     * published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum
     * follows BIP44 specification and generates for Bitcoin wallet with derivation path
     * m'/44'/0'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Bitcoin wallet.</p>
     *
     *
     * @summary Generate a Bitcoin wallet
     * @throws FetchError<400, types.BtcGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.BtcGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGenerateWalletResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGenerateWallet(metadata?: types.BtcGenerateWalletMetadataParam): Promise<FetchResponse<200, types.BtcGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/address/{xpub}/{index}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate a Bitcoin address from the extended public key of the wallet. The address is
     * generated for the specific index - each extended public key can generate up to 2^32
     * addresses with the index starting from 0 up to 2^31 - 1.</p>
     *
     *
     * @summary Generate a Bitcoin address from the wallet's extended public key
     * @throws FetchError<400, types.BtcGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.BtcGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGenerateAddressResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGenerateAddress(metadata: types.BtcGenerateAddressMetadataParam): Promise<FetchResponse<200, types.BtcGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/wallet/priv</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generates a private key for an address from a mnemonic for a given derivation path
     * index. The private key is generated for the specific index - each mnemonic can generate
     * up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate the private key for a Bitcoin address
     * @throws FetchError<400, types.BtcGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.BtcGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGenerateAddressPrivateKeyResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGenerateAddressPrivateKey(body: types.BtcGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.BtcGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/info</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Gets Bitcoin blockchain information. Obtains basic info like the testnet / mainnet
     * version of the chain, the current block number and its hash.</p>
     *
     *
     * @summary Get Bitcoin blockchain information
     * @throws FetchError<401, types.BtcGetBlockChainInfoResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGetBlockChainInfoResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGetBlockChainInfoResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGetBlockChainInfo(): Promise<FetchResponse<200, types.BtcGetBlockChainInfoResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/block/hash/{i}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Gets a Bitcoin block hash. Returns the hash of the block to get the block's
     * details.</p>
     *
     *
     * @summary Get the hash of a Bitcoin block
     * @throws FetchError<400, types.BtcGetBlockHashResponse400> Bad Request
     * @throws FetchError<401, types.BtcGetBlockHashResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGetBlockHashResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGetBlockHashResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGetBlockHash(metadata: types.BtcGetBlockHashMetadataParam): Promise<FetchResponse<200, types.BtcGetBlockHashResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/block/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Gets Bitcoin block detail by block hash or height.</p>
     *
     *
     * @summary Get a Bitcoin block by its hash or height
     * @throws FetchError<400, types.BtcGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.BtcGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.BtcGetBlockResponse404> Block not found.
     * @throws FetchError<500, types.BtcGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGetBlock(metadata: types.BtcGetBlockMetadataParam): Promise<FetchResponse<200, types.BtcGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/address/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of a Bitcoin address.</p>
     * <p>The API returns the balance only if the address has up to 50,000 UTXOs (Unspent
     * Transaction Outputs). For an address with more than 50,000 UTXOs, the API returns an
     * error with the <code>403</code> response code.</p>
     *
     *
     * @summary Get the balance of a Bitcoin address
     * @throws FetchError<400, types.BtcGetBalanceOfAddressResponse400> Bad Request
     * @throws FetchError<401, types.BtcGetBalanceOfAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGetBalanceOfAddressResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGetBalanceOfAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGetBalanceOfAddress(metadata: types.BtcGetBalanceOfAddressMetadataParam): Promise<FetchResponse<200, types.BtcGetBalanceOfAddressResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/address/balance/batch</p>
     * <p><b>50 credits per API call</b></p>
     * <p>Get the balance of multiple Bitcoin addresses, up to 30.</p>
     * <p>The API returns the balance only if the address has up to 50,000 UTXOs (Unspent
     * Transaction Outputs). For an address with more than 50,000 UTXOs, the API returns an
     * error with the <code>403</code> response code.</p>
     *
     *
     * @summary Get the balance of multiple Bitcoin addresses
     * @throws FetchError<400, types.BtcGetBalanceOfAddressBatchResponse400> Bad Request
     * @throws FetchError<401, types.BtcGetBalanceOfAddressBatchResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGetBalanceOfAddressBatchResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGetBalanceOfAddressBatchResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGetBalanceOfAddressBatch(metadata: types.BtcGetBalanceOfAddressBatchMetadataParam): Promise<FetchResponse<200, types.BtcGetBalanceOfAddressBatchResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/transaction/address/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get all transactions for a Bitcoin address. Returns also transactions that are in
     * mempool and haven't been included in a block. In that case blockNumber has a null
     * value.</p>
     *
     *
     * @summary Get all transactions for a Bitcoin address
     * @throws FetchError<400, types.BtcGetTxByAddressResponse400> Bad Request
     * @throws FetchError<401, types.BtcGetTxByAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGetTxByAddressResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGetTxByAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGetTxByAddress(metadata: types.BtcGetTxByAddressMetadataParam): Promise<FetchResponse<200, types.BtcGetTxByAddressResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/transaction/address/batch</p>
     * <p><b>1 credit per address for each API call</b></p>
     * <p>Retrieve transactions for multiple Bitcoin addresses in a batch.</p>
     *
     *
     * @summary Get transactions for multiple Bitcoin addresses in a batch
     * @throws FetchError<400, types.BtcGetTxByAddressBatchResponse400> Bad Request
     * @throws FetchError<401, types.BtcGetTxByAddressBatchResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGetTxByAddressBatchResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGetTxByAddressBatchResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGetTxByAddressBatch(body: types.BtcGetTxByAddressBatchBodyParam): Promise<FetchResponse<200, types.BtcGetTxByAddressBatchResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send BTC to blockchain addresses.</p>
     * <p>Bitcoin transactions are based on UTXOs. "UTXO" stands for "Unspent Transaction
     * Output". A UTXO is the amount of BTC/satoshis that remains at a Bitcoin address after a
     * cryptocurrency transaction involving this address has been performed. The UTXO can then
     * be used as input for a new cryptocurrency transaction. For more information about
     * Bitcoin transactions and UTXO, see the <a
     * href="https://developer.bitcoin.org/devguide/transactions.html" target="_blank">Bitcoin
     * user documentation</a>. To check UTXOs in a transaction, see the <a
     * href="#operation/BtcGetUTXO">API for getting information about a transaction output
     * (UTXO) in a Bitcoin transaction</a>.</p>
     * <p>You can build a BTC transaction by one of the following methods:</p>
     * <ul>
     * <li><b>Sending BTC from blockchain addresses</b><br/>The assets are sent from a list of
     * addresses. For each address, the last 100 transactions are scanned for any UTXO to be
     * included in the transaction. For easier control over the assets to be sent, we recommend
     * that you use this method only if you have one address to send the assets from.<br/> To
     * use this method, use the <code>BtcTransactionFromAddress</code> or
     * <code>BtcTransactionFromAddressKMS</code> schema of the request body.</li>
     * <li><b>Sending BTC from UTXOs</b><br/>The assets are sent from a list of UTXOs. Each
     * UTXO is included in the transaction. Use this method if you want to manually calculate
     * the amount to send.<br/> To use this method, use the <code>BtcTransactionFromUTXO</code>
     * or <code>BtcTransactionFromUTXOKMS</code> schema of the request body.</li>
     * </ul>
     * <p>When an UTXO is entered into a transaction, the whole UTXO amount is included and
     * must be spent. For example, address A receives two transactions, T1 with 1 BTC and T2
     * with 2 BTC. A transaction that consumes the UTXOs from both T1 and T2 will have an
     * available amount of 3 BTC to spend:<br/><code>1 BTC (from T1) + 2 BTC (from T2) = 3 BTC
     * (to spend in total)</code></p>
     * <p>You can send the assets to one or multiple recipients in one transaction. If you send
     * the assets to multiple addresses, each address must have its own amount to receive.</p>
     * <p><b>Paying the gas fee and receiving the change</b><br/>
     * When the amount that the recipients should receive is lower than the amount from the
     * UTXOs, the difference between these two amounts is by default used as the gas fee for
     * the transaction. Because this amount may be considerable and you may not want to spend
     * it all on the gas fee, you can explicitly specify the fee amount and the blockchain
     * address where any extra funds remaining after covering the fee will be sent (the
     * <code>fee</code> and <code>changeAddress</code> parameters in the request body,
     * correspondingly).</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending BTC, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send BTC to Bitcoin addresses
     * @throws FetchError<400, types.BtcTransferBlockchainResponse400> Bad Request
     * @throws FetchError<401, types.BtcTransferBlockchainResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcTransferBlockchainResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcTransferBlockchainResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcTransferBlockchain(body: types.BtcTransferBlockchainBodyParam): Promise<FetchResponse<200, types.BtcTransferBlockchainResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/transaction/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Bitcoin Transaction detail by transaction hash.</p>
     *
     *
     * @summary Get a Bitcoin transaction by its hash
     * @throws FetchError<400, types.BtcGetRawTransactionResponse400> Bad Request
     * @throws FetchError<401, types.BtcGetRawTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGetRawTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGetRawTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGetRawTransaction(metadata: types.BtcGetRawTransactionMetadataParam): Promise<FetchResponse<200, types.BtcGetRawTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/utxo/{hash}/{index}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get information about a transaction output in a transaction and check whether this
     * output is a UTXO or has been spent.</p>
     * <p>"UTXO" stands for "Unspent Transaction Output". A UTXO is the amount of BTC/satoshis
     * that remains at a Bitcoin address after a cryptocurrency transaction involving this
     * address has been performed. The UTXO can then be used as input for a new cryptocurrency
     * transaction. For more information about Bitcoin transactions and UTXO, see the <a
     * href="https://developer.bitcoin.org/devguide/transactions.html" target="_blank">Bitcoin
     * user documentation</a>.</p>
     * <ul>
     * <li>If the transaction output is an UTXO, the API returns data about it.</li>
     * <li>If the transaction output has been spent and there is no UTXO to return, the API
     * returns an error with the <code>404</code> response code.</li>
     * </ul>
     *
     *
     * @summary Get information about a transaction output (UTXO) in a Bitcoin transaction
     * @throws FetchError<400, types.BtcGetUtxoResponse400> Bad Request
     * @throws FetchError<401, types.BtcGetUtxoResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGetUtxoResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGetUtxoResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGetUTXO(metadata: types.BtcGetUtxoMetadataParam): Promise<FetchResponse<200, types.BtcGetUtxoResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/mempool</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Gets Bitcoin transaction IDs in the mempool.</p>
     *
     *
     * @summary Get transactions from the Bitcoin mempool
     * @throws FetchError<400, types.BtcGetMempoolResponse400> Bad Request
     * @throws FetchError<401, types.BtcGetMempoolResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcGetMempoolResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcGetMempoolResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcGetMempool(): Promise<FetchResponse<200, types.BtcGetMempoolResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcasts a signed transaction to the Bitcoin blockchain. This method is used
     * internally from Tatum KMS or Tatum Client Libraries.
     * It is possible to create a custom signing mechanism and only use this method for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast a signed Bitcoin transaction
     * @throws FetchError<400, types.BtcBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.BtcBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BtcBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.BtcBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcBroadcast(body: types.BtcBroadcastBodyParam): Promise<FetchResponse<200, types.BtcBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/bitcoin/node</p>
     * <p>This endpoint is deprecated. Do not use it.<br/>
     * Instead, use <a
     * href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver"
     * target="_blank">this API</a>.</b></p><br/>
     * <p><b>2 credits per API call</b></p>
     * <p>Use this endpoint URL as an http-based JSON RPC driver to connect directly to the
     * node provided by Tatum.
     * To learn more about JSON RPC, visit the <a
     * href="https://developer.bitcoin.org/reference/rpc/index.html" target="_blank">Bitcoin
     * developers' guide</a>.</p>
     *
     *
     * @summary Connect to a Bitcoin node through an RPC driver
     * @throws FetchError<400, types.BtcRpcDriverResponse400> Bad Request
     * @throws FetchError<401, types.BtcRpcDriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BtcRpcDriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    btcRpcDriver(body: types.BtcRpcDriverBodyParam): Promise<FetchResponse<200, types.BtcRpcDriverResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/wallet</p>
     * <b><p>1 credit per API call</p></b>
     * <p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can
     * generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special
     * words in defined order and can restore access to all generated addresses and private
     * keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret
     * value, which should never be revealed</li><li>Public Key - public address to be
     * published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum
     * follows BIP44 specification and generates for Polygon wallet with derivation path
     * m'/44'/966'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Polygon wallet.</p>
     *
     *
     * @summary Generate Polygon wallet
     * @throws FetchError<400, types.PolygonGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.PolygonGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.PolygonGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonGenerateWallet(metadata?: types.PolygonGenerateWalletMetadataParam): Promise<FetchResponse<200, types.PolygonGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/address/{xpub}/{index}</p>
     * <b><p>1 credit per API call</p></b>
     * <p>Generate Polygon account deposit address from Extended public key. Deposit address is
     * generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate Polygon account address from Extended public key
     * @throws FetchError<400, types.PolygonGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.PolygonGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.PolygonGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonGenerateAddress(metadata: types.PolygonGenerateAddressMetadataParam): Promise<FetchResponse<200, types.PolygonGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/wallet/priv</p>
     * <b><p>1 credit per API call</p></b>
     * <p>Generate private key of address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate Polygon private key
     * @throws FetchError<400, types.PolygonGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.PolygonGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.PolygonGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonGenerateAddressPrivateKey(body: types.PolygonGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.PolygonGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the Polygon
     * node provided by Tatum.
     * To learn more about Polygon Web3, visit the <a href="https://docs.matic.network/"
     * target="_blank">Polygon developer's guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.PolygonWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.PolygonWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.PolygonWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonWeb3Driver(body: types.PolygonWeb3DriverBodyParam, metadata: types.PolygonWeb3DriverMetadataParam): Promise<FetchResponse<200, types.PolygonWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/block/current</p>
     * <b><p>1 credit per API call</p></b>
     * <p>Get Polygon current block number. This is the number of the latest block in the
     * blockchain.</p>
     *
     *
     * @summary Get current block number
     * @throws FetchError<401, types.PolygonGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.PolygonGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonGetCurrentBlock(): Promise<FetchResponse<200, types.PolygonGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/block/{hash}</p>
     * <b><p>1 credit per API call</p></b>
     * <p>Get Polygon block by block hash or block number.</p>
     *
     *
     * @summary Get Polygon block by hash
     * @throws FetchError<400, types.PolygonGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.PolygonGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.PolygonGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonGetBlock(metadata: types.PolygonGetBlockMetadataParam): Promise<FetchResponse<200, types.PolygonGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/account/balance/{address}</p>
     * <b><p>1 credit per API call</p></b>
     * <p>Get Polygon account balance in MATIC. This method does not prints any balance of the
     * ERC20 or ERC721 tokens on the account.</p>
     *
     *
     * @summary Get Polygon Account balance
     * @throws FetchError<400, types.PolygonGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.PolygonGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.PolygonGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonGetBalance(metadata: types.PolygonGetBalanceMetadataParam): Promise<FetchResponse<200, types.PolygonGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/transaction/{hash}</p>
     * <b><p>2 credits per API call</p></b>
     * <p>Get Polygon transaction by transaction hash.</p>
     *
     *
     * @summary Get Polygon Transaction
     * @throws FetchError<400, types.PolygonGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.PolygonGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.PolygonGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.PolygonGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonGetTransaction(metadata: types.PolygonGetTransactionMetadataParam): Promise<FetchResponse<200, types.PolygonGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/account/transaction/{address}</p>
     * <p>This endpoint is deprecated. Do not use it.</p>
     * <b><p>1 credit per API call</p></b>
     * <p>Get Polygon transactions by address. This includes incoming and outgoing transactions
     * for the address.</p>
     *
     *
     * @summary Get Polygon transactions by address
     * @throws FetchError<400, types.PolygonGetTransactionByAddressResponse400> Bad Request
     * @throws FetchError<401, types.PolygonGetTransactionByAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.PolygonGetTransactionByAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonGetTransactionByAddress(metadata: types.PolygonGetTransactionByAddressMetadataParam): Promise<FetchResponse<200, types.PolygonGetTransactionByAddressResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/transaction/count/{address}</p>
     * <b><p>1 credit per API call</p></b>
     * <p>Get a number of outgoing Polygon transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Polygon transactions
     * @throws FetchError<400, types.PolygonGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.PolygonGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.PolygonGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonGetTransactionCount(metadata: types.PolygonGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.PolygonGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/transaction</p>
     * <b><p>2 credits per API call</p></b>
     * <p>Send MATIC from account to account.<br/><br/>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending MATIC, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send MATIC from account to account
     * @throws FetchError<400, types.PolygonBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.PolygonBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.PolygonBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.PolygonBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonBlockchainTransfer(body: types.PolygonBlockchainTransferBodyParam): Promise<FetchResponse<200, types.PolygonBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/smartcontract</p>
     * <b><p>2 credits per API call</p></b>
     * <p>Invoke a method in an existing smart contract on Polygon.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>If <b>caller</b> field is present instead of the private key, Tatum will sign the
     * transaction with the managed private key connected to the caller address. This is
     * applicable only for paid mainnet plans and all testnet plans. Keep in mind that the
     * caller address must have enough access right to perform the action in the smart contract
     * method.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Invoke a method in a smart contract on Polygon
     * @throws FetchError<400, types.PolygonBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.PolygonBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.PolygonBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.PolygonBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonBlockchainSmartContractInvocation(body: types.PolygonBlockchainSmartContractInvocationBodyParam): Promise<FetchResponse<200, types.PolygonBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/polygon/broadcast</p>
     * <b><p>2 credits per API call</p></b>
     * <p>Broadcast signed transaction to Polygon blockchain. This method is used internally
     * from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed Polygon transaction
     * @throws FetchError<400, types.PolygonBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.PolygonBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.PolygonBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.PolygonBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    polygonBroadcast(body: types.PolygonBroadcastBodyParam): Promise<FetchResponse<200, types.PolygonBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/wallet</p>
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can
     * generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A
     * mnemonic phrase consists of 24 special words in a defined order and can restore access
     * to all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value which should never be
     * revealed</li><li>Public Key - a public address to be published</li><li>Derivation index
     * - an index of generated address</li></ul></p><p>Tatum follows the BIP44 specification
     * and generates for Cronos wallets with the derivation path m/44'/60'/0'/0. More about
     * BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generates a BIP44 compatible Cronos wallet.</p>
     *
     *
     * @summary Generate Cronos wallet
     * @throws FetchError<400, types.CronosGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.CronosGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CronosGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosGenerateWallet(metadata?: types.CronosGenerateWalletMetadataParam): Promise<FetchResponse<200, types.CronosGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/address/{xpub}/{index}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates an Cronos account deposit address from an Extended public key. The deposit
     * address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Cronos account address from Extended public key
     * @throws FetchError<400, types.CronosGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.CronosGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CronosGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosGenerateAddress(metadata: types.CronosGenerateAddressMetadataParam): Promise<FetchResponse<200, types.CronosGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/wallet/priv</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates the private key of an address from a mnemonic for a given derivation path
     * index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Cronos private key
     * @throws FetchError<400, types.CronosGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.CronosGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CronosGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosGenerateAddressPrivateKey(body: types.CronosGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.CronosGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based web3 driver to connect directly to the Cronos
     * node provided by Tatum.
     * To learn more about Cronos Web3, visit the <a href="https://cronos.network/"
     * target="_blank">Cronos developers' guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.CronosWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.CronosWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CronosWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosWeb3Driver(body: types.CronosWeb3DriverBodyParam, metadata: types.CronosWeb3DriverMetadataParam): Promise<FetchResponse<200, types.CronosWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/block/current</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets the current Cronos block number. This is the
     * number of the latest block in the blockchain.</p>
     *
     * @summary Get current block number
     * @throws FetchError<401, types.CronosGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CronosGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosGetCurrentBlock(): Promise<FetchResponse<200, types.CronosGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/block/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets an Cronos block-by-block hash or block
     * number.</p>
     *
     * @summary Get Cronos block by hash
     * @throws FetchError<400, types.CronosGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.CronosGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CronosGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosGetBlock(metadata: types.CronosGetBlockMetadataParam): Promise<FetchResponse<200, types.CronosGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of <b>CRO</b> of an Cronos account.</p>
     * <p>To get the balance of <b>tokens</b>, use the APIs for getting the balance of <a
     * href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20GetBalanceAddress"
     * target="_blank">fungible tokens (ERC-20)</a> and <a
     * href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetTokensByAddressErc721"
     * target="_blank">NFTs (ERC-721)</a>.</p>
     *
     *
     * @summary Get the CRO balance of an Cronos account
     * @throws FetchError<400, types.CronosGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.CronosGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CronosGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosGetBalance(metadata: types.CronosGetBalanceMetadataParam): Promise<FetchResponse<200, types.CronosGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/transaction/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Cronos transaction by transaction hash.</p>
     *
     *
     * @summary Get Cronos Transaction
     * @throws FetchError<400, types.CronosGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.CronosGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.CronosGetTransactionResponse404> Transaction not found.
     * @throws FetchError<500, types.CronosGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosGetTransaction(metadata: types.CronosGetTransactionMetadataParam): Promise<FetchResponse<200, types.CronosGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/transaction/count/{address}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Cronos transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Cronos transactions
     * @throws FetchError<400, types.CronosGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.CronosGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CronosGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosGetTransactionCount(metadata: types.CronosGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.CronosGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send CRO or Tatum-supported fungible tokens (ERC-20) from account to account.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> Sending the fungible tokens is
     * supported only on the mainnet.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending CRO, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     *
     *
     * @summary Send CRO or fungible tokens (ERC-20) from account to account
     * @throws FetchError<400, types.CronosBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.CronosBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.CronosBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.CronosBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosBlockchainTransfer(body: types.CronosBlockchainTransferBodyParam): Promise<FetchResponse<200, types.CronosBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Cronos.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>If <b>caller</b> field is present instead of the private key, Tatum will sign the
     * transaction with the managed private key connected to the caller address. This is
     * applicable only for paid mainnet plans and all testnet plans. Keep in mind that the
     * caller address must have enough access right to perform the action in the smart contract
     * method.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     *
     *
     * @summary Invoke a method in a smart contract on Cronos
     * @throws FetchError<400, types.CronosBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.CronosBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.CronosBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.CronosBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosBlockchainSmartContractInvocation(body: types.CronosBlockchainSmartContractInvocationBodyParam): Promise<FetchResponse<200, types.CronosBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/cronos/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Cronos blockchain.</p>
     *
     *
     * @summary Broadcast signed Cronos transaction
     * @throws FetchError<400, types.CronosBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.CronosBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.CronosBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.CronosBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    cronosBroadcast(body: types.CronosBroadcastBodyParam): Promise<FetchResponse<200, types.CronosBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/wallet</p>
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can
     * generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A
     * mnemonic phrase consists of 24 special words in a defined order and can restore access
     * to all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value which should never be
     * revealed</li><li>Public Key - a public address to be published</li><li>Derivation index
     * - an index of generated address</li></ul></p><p>Tatum follows the BIP44 specification
     * and generates for Fantom wallets with the derivation path m/44'/60'/0'/0. More about
     * BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generates a BIP44 compatible Fantom wallet.</p>
     *
     *
     * @summary Generate Fantom wallet
     * @throws FetchError<400, types.FantomGenerateWalletResponse400> Bad Request. Validation failed for the given object in the HTTP Body or Request
     * parameters.
     * @throws FetchError<401, types.FantomGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FantomGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomGenerateWallet(metadata?: types.FantomGenerateWalletMetadataParam): Promise<FetchResponse<200, types.FantomGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/address/{xpub}/{index}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates an Fantom account deposit address from an Extended public key. The deposit
     * address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Fantom account address from Extended public key
     * @throws FetchError<400, types.FantomGenerateAddressResponse400> Bad Request. Validation failed for the given object in the HTTP Body or Request
     * parameters.
     * @throws FetchError<401, types.FantomGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FantomGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomGenerateAddress(metadata: types.FantomGenerateAddressMetadataParam): Promise<FetchResponse<200, types.FantomGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/wallet/priv</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates the private key of an address from a mnemonic for a given derivation path
     * index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Fantom private key
     * @throws FetchError<400, types.FantomGenerateAddressPrivateKeyResponse400> Bad Request. Validation failed for the given object in the HTTP Body or Request
     * parameters.
     * @throws FetchError<401, types.FantomGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FantomGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomGenerateAddressPrivateKey(body: types.FantomGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.FantomGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based web3 driver to connect directly to the Fantom
     * node provided by Tatum.
     * To learn more about Fantom Web3, visit the <a href="https://fantom.network/"
     * target="_blank">Fantom developers' guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.FantomWeb3DriverResponse400> Bad Request. Validation failed for the given object in the HTTP Body or Request
     * parameters.
     * @throws FetchError<401, types.FantomWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FantomWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomWeb3Driver(body: types.FantomWeb3DriverBodyParam, metadata: types.FantomWeb3DriverMetadataParam): Promise<FetchResponse<200, types.FantomWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/block/current</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets the current Fantom block number. This is the
     * number of the latest block in the blockchain.</p>
     *
     * @summary Get current block number
     * @throws FetchError<401, types.FantomGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FantomGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomGetCurrentBlock(): Promise<FetchResponse<200, types.FantomGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/block/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets an Fantom block-by-block hash or block
     * number.</p>
     *
     * @summary Get Fantom block by hash
     * @throws FetchError<400, types.FantomGetBlockResponse400> Bad Request. Validation failed for the given object in the HTTP Body or Request
     * parameters.
     * @throws FetchError<401, types.FantomGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FantomGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomGetBlock(metadata: types.FantomGetBlockMetadataParam): Promise<FetchResponse<200, types.FantomGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of <b>FTM</b> of an Fantom account.</p>
     * <p>To get the balance of <b>tokens</b>, use the APIs for getting the balance of <a
     * href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20GetBalanceAddress"
     * target="_blank">fungible tokens (ERC-20)</a> and <a
     * href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetTokensByAddressErc721"
     * target="_blank">NFTs (ERC-721)</a>.</p>
     *
     *
     * @summary Get the FTM balance of an Fantom account
     * @throws FetchError<400, types.FantomGetBalanceResponse400> Bad Request. Validation failed for the given object in the HTTP Body or Request
     * parameters.
     * @throws FetchError<401, types.FantomGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FantomGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomGetBalance(metadata: types.FantomGetBalanceMetadataParam): Promise<FetchResponse<200, types.FantomGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/transaction/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Fantom transaction by transaction hash.</p>
     *
     *
     * @summary Get Fantom Transaction
     * @throws FetchError<400, types.FantomGetTransactionResponse400> Bad Request. Validation failed for the given object in the HTTP Body or Request
     * parameters.
     * @throws FetchError<401, types.FantomGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.FantomGetTransactionResponse404> Transaction not found.
     * @throws FetchError<500, types.FantomGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomGetTransaction(metadata: types.FantomGetTransactionMetadataParam): Promise<FetchResponse<200, types.FantomGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/transaction/count/{address}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Fantom transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Fantom transactions
     * @throws FetchError<400, types.FantomGetTransactionCountResponse400> Bad Request. Validation failed for the given object in the HTTP Body or Request
     * parameters.
     * @throws FetchError<401, types.FantomGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FantomGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomGetTransactionCount(metadata: types.FantomGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.FantomGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send FTM or Tatum-supported fungible tokens (ERC-20) from account to account.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> Sending the fungible tokens is
     * supported only on the mainnet.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending FTM, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     *
     *
     * @summary Send FTM or fungible tokens (ERC-20) from account to account
     * @throws FetchError<400, types.FantomBlockchainTransferResponse400> Bad Request. Validation failed for the given object in the HTTP Body or Request
     * parameters.
     * @throws FetchError<401, types.FantomBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FantomBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FantomBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomBlockchainTransfer(body: types.FantomBlockchainTransferBodyParam): Promise<FetchResponse<200, types.FantomBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Fantom.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>If <b>caller</b> field is present instead of the private key, Tatum will sign the
     * transaction with the managed private key connected to the caller address. This is
     * applicable only for paid mainnet plans and all testnet plans. Keep in mind that the
     * caller address must have enough access right to perform the action in the smart contract
     * method.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     *
     *
     * @summary Invoke a method in a smart contract on Fantom
     * @throws FetchError<400, types.FantomBlockchainSmartContractInvocationResponse400> Bad Request. Validation failed for the given object in the HTTP Body or Request
     * parameters.
     * @throws FetchError<401, types.FantomBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FantomBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FantomBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomBlockchainSmartContractInvocation(body: types.FantomBlockchainSmartContractInvocationBodyParam): Promise<FetchResponse<200, types.FantomBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/fantom/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Fantom blockchain.</p>
     *
     *
     * @summary Broadcast signed Fantom transaction
     * @throws FetchError<400, types.FantomBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.FantomBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FantomBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FantomBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    fantomBroadcast(body: types.FantomBroadcastBodyParam): Promise<FetchResponse<200, types.FantomBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/wallet</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can
     * generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special
     * words in defined order and can restore access to all generated addresses and private
     * keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret
     * value, which should never be revealed</li><li>Public Key - public address to be
     * published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum
     * follows BIP44 specification and generates for Klaytn wallet with derivation path
     * m'/44'/966'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Klaytn wallet.</p>
     *
     *
     * @summary Generate Klaytn wallet
     * @throws FetchError<400, types.KlaytnGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.KlaytnGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KlaytnGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnGenerateWallet(metadata?: types.KlaytnGenerateWalletMetadataParam): Promise<FetchResponse<200, types.KlaytnGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/address/{xpub}/{index}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate Klaytn account deposit address from Extended public key. Deposit address is
     * generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate Klaytn account address from Extended public key
     * @throws FetchError<400, types.KlaytnGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.KlaytnGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KlaytnGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnGenerateAddress(metadata: types.KlaytnGenerateAddressMetadataParam): Promise<FetchResponse<200, types.KlaytnGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/wallet/priv</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate private key of address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate Klaytn private key
     * @throws FetchError<400, types.KlaytnGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.KlaytnGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KlaytnGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnGenerateAddressPrivateKey(body: types.KlaytnGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.KlaytnGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the Klaytn
     * node provided by Tatum.
     * To learn more about Klaytn Web3, visit the <a
     * href="https://docs.klaytn.foundation/dapp/json-rpc" target="_blank">Klaytn developer's
     * guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.KlaytnWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.KlaytnWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KlaytnWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnWeb3Driver(body: types.KlaytnWeb3DriverBodyParam, metadata: types.KlaytnWeb3DriverMetadataParam): Promise<FetchResponse<200, types.KlaytnWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/block/current</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Klaytn current block number. This is the number of the latest block in the
     * blockchain.</p>
     *
     *
     * @summary Get current block number
     * @throws FetchError<401, types.KlaytnGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KlaytnGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnGetCurrentBlock(): Promise<FetchResponse<200, types.KlaytnGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/block/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Klaytn block by block hash or block number.</p>
     *
     *
     * @summary Get Klaytn block by hash
     * @throws FetchError<400, types.KlaytnGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.KlaytnGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KlaytnGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnGetBlock(metadata: types.KlaytnGetBlockMetadataParam): Promise<FetchResponse<200, types.KlaytnGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Klaytn account balance in KLAY. This method does not prints any balance of the
     * ERC20 or ERC721 tokens on the account.</p>
     *
     *
     * @summary Get Klaytn Account balance
     * @throws FetchError<400, types.KlaytnGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.KlaytnGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KlaytnGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnGetBalance(metadata: types.KlaytnGetBalanceMetadataParam): Promise<FetchResponse<200, types.KlaytnGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/transaction/{hash}</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Get Klaytn transaction by transaction hash.</p>
     *
     *
     * @summary Get Klaytn Transaction
     * @throws FetchError<400, types.KlaytnGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.KlaytnGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.KlaytnGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.KlaytnGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnGetTransaction(metadata: types.KlaytnGetTransactionMetadataParam): Promise<FetchResponse<200, types.KlaytnGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/transaction/count/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get a number of outgoing Klaytn transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions, which are not yet processed by the
     * blockchain. To distinguish between them, there is a counter called a nonce, which
     * represents the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Klaytn transactions
     * @throws FetchError<400, types.KlaytnGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.KlaytnGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KlaytnGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnGetTransactionCount(metadata: types.KlaytnGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.KlaytnGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send KLAY from account to account.<br/><br/>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending KLAY, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send KLAY from account to account
     * @throws FetchError<400, types.KlaytnBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.KlaytnBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.KlaytnBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.KlaytnBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnBlockchainTransfer(body: types.KlaytnBlockchainTransferBodyParam): Promise<FetchResponse<200, types.KlaytnBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Klaytn.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Invoke a method in a smart contract on Klaytn
     * @throws FetchError<400, types.KlaytnBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.KlaytnBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.KlaytnBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.KlaytnBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnBlockchainSmartContractInvocation(body: types.KlaytnBlockchainSmartContractInvocationBodyParam): Promise<FetchResponse<200, types.KlaytnBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/klaytn/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Klaytn blockchain. This method is used internally
     * from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed Klaytn transaction
     * @throws FetchError<400, types.KlaytnBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.KlaytnBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.KlaytnBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.KlaytnBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    klaytnBroadcast(body: types.KlaytnBroadcastBodyParam): Promise<FetchResponse<200, types.KlaytnBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/solana/wallet</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate Solana private key and account address.</p>
     *
     *
     * @summary Generate Solana wallet
     * @throws FetchError<400, types.SolanaGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.SolanaGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.SolanaGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    solanaGenerateWallet(): Promise<FetchResponse<200, types.SolanaGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/solana/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based JSON RPC driver to connect directly to the
     * Solana node provided by Tatum.
     * To learn more about Solana JSON RPC, visit the <a
     * href="https://docs.solana.com/developing/clients/jsonrpc-api" target="_blank">Solana
     * developer's guide</a>.</p>
     *
     *
     * @summary JSON RPC HTTP driver
     * @throws FetchError<400, types.SolanaWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.SolanaWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.SolanaWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    solanaWeb3Driver(body: types.SolanaWeb3DriverBodyParam, metadata: types.SolanaWeb3DriverMetadataParam): Promise<FetchResponse<200, types.SolanaWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/solana/block/current</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Solana current block number. This is the
     * number of the latest block in the blockchain.</p>
     *
     * @summary Get current block number
     * @throws FetchError<401, types.SolanaGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.SolanaGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    solanaGetCurrentBlock(): Promise<FetchResponse<200, types.SolanaGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/solana/block/{height}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get Solana block by block hash or block number. <br/>
     * You can find full data description here - <a target="blank"
     * href="https://docs.solana.com/developing/clients/jsonrpc-api#getblock">https://docs.solana.com/developing/clients/jsonrpc-api#getblock</a>
     * </p>
     *
     *
     * @summary Get Solana block by number
     * @throws FetchError<400, types.SolanaGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.SolanaGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.SolanaGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    solanaGetBlock(metadata: types.SolanaGetBlockMetadataParam): Promise<FetchResponse<200, types.SolanaGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/solana/account/balance/{address}</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Solana account balance in SOL. This method
     * does not prints any balance of the SPL or NFT tokens on the account.</p>
     *
     * @summary Get Solana Account balance
     * @throws FetchError<400, types.SolanaGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.SolanaGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.SolanaGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    solanaGetBalance(metadata: types.SolanaGetBalanceMetadataParam): Promise<FetchResponse<200, types.SolanaGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/solana/transaction/{hash}</p>
     * <h4>2 credit per API call.</h4><br/><p>Get Solana transaction by transaction hash.<br/>
     * You can find full data description here - <a target="blank"
     * href="https://docs.solana.com/developing/clients/jsonrpc-api#gettransaction">https://docs.solana.com/developing/clients/jsonrpc-api#gettransaction</a>
     * </p>
     *
     *
     * @summary Get Solana Transaction
     * @throws FetchError<400, types.SolanaGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.SolanaGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.SolanaGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.SolanaGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    solanaGetTransaction(metadata: types.SolanaGetTransactionMetadataParam): Promise<FetchResponse<200, types.SolanaGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/solana/transaction</p>
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send SOL from account to account.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and loss of funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Send SOL from account to account
     * @throws FetchError<400, types.SolanaBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.SolanaBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.SolanaBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.SolanaBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    solanaBlockchainTransfer(body: types.SolanaBlockchainTransferBodyParam): Promise<FetchResponse<200, types.SolanaBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/solana/broadcast/confirm</p>
     * <h4>10 credits per API call.</h4><br/>
     * <p>Broadcast signed custom transactions to Solana blockchain and waits for transaction
     * confirmation depending on the commitment given. More information about commitment levels
     * <a target="_blank"
     * href="https://docs.solana.com/ru/developing/clients/jsonrpc-api#configuring-state-commitment">here</a></p>
     *
     *
     * @summary Broadcast and confirm signed Solana transaction
     * @throws FetchError<400, types.SolanaBroadcastConfirmResponse400> Bad Request
     * @throws FetchError<401, types.SolanaBroadcastConfirmResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.SolanaBroadcastConfirmResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.SolanaBroadcastConfirmResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    solanaBroadcastConfirm(body: types.SolanaBroadcastConfirmBodyParam): Promise<FetchResponse<200, types.SolanaBroadcastConfirmResponse200>>;
    /**
     * <p style="display: none">/v3/bcash/wallet</p>
     * <h4>5 credits per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very
     * convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase.
     * Mnemonic phrase consists of 24 special words in defined order and can restore access to
     * all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value, which should never be
     * revealed</li><li>Public Key - public address to be published</li><li>Derivation index -
     * index of generated address</li></ul></p><p>Tatum follows BIP44 specification and
     * generates for Bitcoin Cash wallet with derivation path m'/44'/145'/0'/0. More about
     * BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Bitcoin Cash wallet.</p>
     *
     *
     * @summary Generate Bitcoin Cash wallet
     * @throws FetchError<400, types.BchGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.BchGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BchGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bchGenerateWallet(metadata?: types.BchGenerateWalletMetadataParam): Promise<FetchResponse<200, types.BchGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/bcash/node</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based JSON RPC driver to connect directly to the
     * node provided by Tatum.
     * To learn more about JSON RPC, visit <a
     * href="https://github.com/gcash/bchd/blob/master/docs/json_rpc_api.md#Methods"
     * target="_blank">Bitcoin Cash developers' guide</a>.</p>
     *
     *
     * @summary JSON RPC HTTP driver
     * @throws FetchError<400, types.BchRpcDriverResponse400> Bad Request
     * @throws FetchError<401, types.BchRpcDriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BchRpcDriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bchRpcDriver(body: types.BchRpcDriverBodyParam): Promise<FetchResponse<200, types.BchRpcDriverResponse200>>;
    /**
     * <p style="display: none">/v3/bcash/info</p>
     * <h4>5 credits per API call.</h4><br/><p>Get Bitcoin Cash Blockchain Information. Obtain
     * basic info like testnet / mainnet version of the chain, current block number and it's
     * hash.</p>
     *
     * @summary Get Bitcoin Cash Blockchain Information
     * @throws FetchError<401, types.BchGetBlockChainInfoResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BchGetBlockChainInfoResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BchGetBlockChainInfoResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bchGetBlockChainInfo(): Promise<FetchResponse<200, types.BchGetBlockChainInfoResponse200>>;
    /**
     * <p style="display: none">/v3/bcash/block/hash/{i}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get Bitcoin Cash Block hash. Returns hash of the
     * block to get the block detail.</p>
     *
     * @summary Get Bitcoin Cash Block hash
     * @throws FetchError<400, types.BchGetBlockHashResponse400> Bad Request
     * @throws FetchError<401, types.BchGetBlockHashResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BchGetBlockHashResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BchGetBlockHashResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bchGetBlockHash(metadata: types.BchGetBlockHashMetadataParam): Promise<FetchResponse<200, types.BchGetBlockHashResponse200>>;
    /**
     * <p style="display: none">/v3/bcash/block/{hash}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get Bitcoin Cash Block detail by block hash or
     * height.</p>
     *
     * @summary Get Bitcoin Cash Block by hash
     * @throws FetchError<400, types.BchGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.BchGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BchGetBlockResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BchGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bchGetBlock(metadata: types.BchGetBlockMetadataParam): Promise<FetchResponse<200, types.BchGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/bcash/transaction/{hash}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get Bitcoin Cash Transaction by transaction
     * hash.</p>
     *
     * @summary Get Bitcoin Cash Transaction by hash
     * @throws FetchError<400, types.BchGetRawTransactionResponse400> Bad Request
     * @throws FetchError<401, types.BchGetRawTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BchGetRawTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BchGetRawTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bchGetRawTransaction(metadata: types.BchGetRawTransactionMetadataParam): Promise<FetchResponse<200, types.BchGetRawTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/bcash/transaction/address/{address}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get Bitcoin Cash Transaction by address. Limit
     * is 50 transaction per response.</p>
     *
     * @summary Get Bitcoin Cash Transactions by address
     * @throws FetchError<400, types.BchGetTxByAddressResponse400> Bad Request
     * @throws FetchError<401, types.BchGetTxByAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BchGetTxByAddressResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BchGetTxByAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bchGetTxByAddress(metadata: types.BchGetTxByAddressMetadataParam): Promise<FetchResponse<200, types.BchGetTxByAddressResponse200>>;
    /**
     * <p style="display: none">/v3/bcash/address/{xpub}/{index}</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate Bitcoin Cash deposit address from Extended public key. Deposit address is
     * generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1. Generates new format of
     * address starting with bitcoincash: in case of mainnet, bchtest: in case of testnet..</p>
     *
     *
     * @summary Generate Bitcoin Cash deposit address from Extended public key
     * @throws FetchError<400, types.BchGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.BchGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BchGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bchGenerateAddress(metadata: types.BchGenerateAddressMetadataParam): Promise<FetchResponse<200, types.BchGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/bcash/wallet/priv</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate private key for address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Bitcoin Cash private key
     * @throws FetchError<400, types.BchGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.BchGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BchGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bchGenerateAddressPrivateKey(body: types.BchGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.BchGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/bcash/transaction</p>
     * <p><b>10 credits per API call</b></p>
     * <p>Send BCH to blockchain addresses.</p>
     * <p>Bitcoin Cash transactions are based on UTXOs. "UTXO" stands for "Unspent Transaction
     * Output". A UTXO is the amount of BCH that remains at a Bitcoin Cash address after a
     * cryptocurrency transaction involving this address has been performed. The UTXO can then
     * be used as input for a new cryptocurrency transaction. For more information the UTXO,
     * see the <a href="https://developer.bitcoin.org/devguide/transactions.html"
     * target="_blank">Bitcoin user documentation</a>.</p>
     * <p>You build a BCH transaction by sending BCH from UTXOs. Each UTXO is included in the
     * transaction.</p>
     * <p>When an UTXO is entered into a transaction, the whole UTXO amount is included and
     * must be spent. For example, address A receives two transactions, T1 with 1 BCH and T2
     * with 2 BCH. A transaction that consumes the UTXOs from both T1 and T2 will have an
     * available amount of 3 BCH to spend:<br/><code>1 BCH (from T1) + 2 BCH (from T2) = 3 BCH
     * (to spend in total)</code></p>
     * <p>You can send the assets to one or multiple recipients in one transaction. If you send
     * the assets to multiple addresses, each address must have its own amount to receive.</p>
     * <p><b>Paying the gas fee and receiving the change</b><br/>
     * When the amount that the recipients should receive is lower than the amount from the
     * UTXOs, the difference between these two amounts is by default used as the gas fee for
     * the transaction. Because this amount may be considerable and you may not want to spend
     * it all on the gas fee, you can explicitly specify the fee amount and the blockchain
     * address where any extra funds remaining after covering the fee will be sent (the
     * <code>fee</code> and <code>changeAddress</code> parameters in the request body,
     * correspondingly).</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending BCH, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send BCH to Bitcoin Cash addresses
     * @throws FetchError<400, types.BchTransferBlockchainResponse400> Bad Request
     * @throws FetchError<401, types.BchTransferBlockchainResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BchTransferBlockchainResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BchTransferBlockchainResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bchTransferBlockchain(body: types.BchTransferBlockchainBodyParam): Promise<FetchResponse<200, types.BchTransferBlockchainResponse200>>;
    /**
     * <p style="display: none">/v3/bcash/broadcast</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Bitcoin Cash blockchain. This method is used
     * internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed Bitcoin Cash transaction
     * @throws FetchError<400, types.BchBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.BchBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BchBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BchBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bchBroadcast(body: types.BchBroadcastBodyParam): Promise<FetchResponse<200, types.BchBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/flare/wallet</p>
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can
     * generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A
     * mnemonic phrase consists of 24 special words in a defined order and can restore access
     * to all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value which should never be
     * revealed</li><li>Public Key - a public address to be published</li><li>Derivation index
     * - an index of generated address</li></ul></p><p>Tatum follows the BIP44 specification
     * and generates for Flare wallets with the derivation path m/44'/60'/0'/0. More about
     * BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generates a BIP44 compatible Flare wallet.</p>
     *
     *
     * @summary Generate Flare wallet
     * @throws FetchError<400, types.FlareGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.FlareGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FlareGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareGenerateWallet(metadata?: types.FlareGenerateWalletMetadataParam): Promise<FetchResponse<200, types.FlareGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/flare/address/{xpub}/{index}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates an Flare account deposit address from an Extended public key. The deposit
     * address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Flare account address from Extended public key
     * @throws FetchError<400, types.FlareGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.FlareGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FlareGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareGenerateAddress(metadata: types.FlareGenerateAddressMetadataParam): Promise<FetchResponse<200, types.FlareGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/flare/wallet/priv</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates the private key of an address from a mnemonic for a given derivation path
     * index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Flare private key
     * @throws FetchError<400, types.FlareGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.FlareGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FlareGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareGenerateAddressPrivateKey(body: types.FlareGenerateAddressPrivateKeyBodyParam, metadata?: types.FlareGenerateAddressPrivateKeyMetadataParam): Promise<FetchResponse<200, types.FlareGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/flare/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based web3 driver to connect directly to the Flare
     * node provided by Tatum.
     * To learn more about Flare Web3, visit the <a href="https://flare.network/"
     * target="_blank">Flare developers' guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.FlareWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.FlareWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FlareWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareWeb3Driver(body: types.FlareWeb3DriverBodyParam, metadata: types.FlareWeb3DriverMetadataParam): Promise<FetchResponse<200, types.FlareWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/flare/block/current</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets the current Flare block number. This is the
     * number of the latest block in the blockchain.</p>
     *
     * @summary Get current block number
     * @throws FetchError<401, types.FlareGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FlareGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareGetCurrentBlock(metadata?: types.FlareGetCurrentBlockMetadataParam): Promise<FetchResponse<200, types.FlareGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/flare/block/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets an Flare block-by-block hash or block
     * number.</p>
     *
     * @summary Get Flare block by hash
     * @throws FetchError<400, types.FlareGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.FlareGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FlareGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareGetBlock(metadata: types.FlareGetBlockMetadataParam): Promise<FetchResponse<200, types.FlareGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/flare/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of <b>FLR</b> of an Flare account.</p>
     * <p>To get the balance of <b>tokens</b>, use the APIs for getting the balance of <a
     * href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20GetBalanceAddress"
     * target="_blank">fungible tokens (ERC-20)</a> and <a
     * href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetTokensByAddressErc721"
     * target="_blank">NFTs (ERC-721)</a>.</p>
     *
     *
     * @summary Get the FLR balance of an Flare account
     * @throws FetchError<400, types.FlareGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.FlareGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FlareGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareGetBalance(metadata: types.FlareGetBalanceMetadataParam): Promise<FetchResponse<200, types.FlareGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/flare/transaction/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Flare transaction by transaction hash.</p>
     *
     *
     * @summary Get Flare Transaction
     * @throws FetchError<400, types.FlareGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.FlareGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.FlareGetTransactionResponse404> Transaction not found.
     * @throws FetchError<500, types.FlareGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareGetTransaction(metadata: types.FlareGetTransactionMetadataParam): Promise<FetchResponse<200, types.FlareGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/flare/transaction/count/{address}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Flare transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Flare transactions
     * @throws FetchError<400, types.FlareGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.FlareGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.FlareGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareGetTransactionCount(metadata: types.FlareGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.FlareGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/flare/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send FLR or Tatum-supported fungible tokens (ERC-20) from account to account.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> Sending the fungible tokens is
     * supported only on the mainnet.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending FLR, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     *
     *
     * @summary Send FLR or fungible tokens (ERC-20) from account to account
     * @throws FetchError<400, types.FlareBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.FlareBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlareBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlareBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareBlockchainTransfer(body: types.FlareBlockchainTransferBodyParam, metadata?: types.FlareBlockchainTransferMetadataParam): Promise<FetchResponse<200, types.FlareBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/flare/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Flare.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>If <b>caller</b> field is present instead of the private key, Tatum will sign the
     * transaction with the managed private key connected to the caller address. This is
     * applicable only for paid mainnet plans and all testnet plans. Keep in mind that the
     * caller address must have enough access right to perform the action in the smart contract
     * method.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     *
     *
     * @summary Invoke a method in a smart contract on Flare
     * @throws FetchError<400, types.FlareBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.FlareBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlareBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlareBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareBlockchainSmartContractInvocation(body: types.FlareBlockchainSmartContractInvocationBodyParam, metadata?: types.FlareBlockchainSmartContractInvocationMetadataParam): Promise<FetchResponse<200, types.FlareBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/flare/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Flare blockchain.</p>
     *
     *
     * @summary Broadcast signed Flare transaction
     * @throws FetchError<400, types.FlareBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.FlareBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlareBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlareBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flareBroadcast(body: types.FlareBroadcastBodyParam, metadata?: types.FlareBroadcastMetadataParam): Promise<FetchResponse<200, types.FlareBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/base/wallet</p>
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can
     * generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A
     * mnemonic phrase consists of 24 special words in a defined order and can restore access
     * to all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value which should never be
     * revealed</li><li>Public Key - a public address to be published</li><li>Derivation index
     * - an index of generated address</li></ul></p><p>Tatum follows the BIP44 specification
     * and generates for Base wallets with the derivation path m/44'/60'/0'/0. More about BIP44
     * HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generates a BIP44 compatible Base wallet.</p>
     *
     *
     * @summary Generate Base wallet
     * @throws FetchError<400, types.BaseGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.BaseGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BaseGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseGenerateWallet(metadata?: types.BaseGenerateWalletMetadataParam): Promise<FetchResponse<200, types.BaseGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/base/address/{xpub}/{index}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates an Base account deposit address from an Extended public key. The deposit
     * address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Base account address from Extended public key
     * @throws FetchError<400, types.BaseGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.BaseGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BaseGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseGenerateAddress(metadata: types.BaseGenerateAddressMetadataParam): Promise<FetchResponse<200, types.BaseGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/base/wallet/priv</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates the private key of an address from a mnemonic for a given derivation path
     * index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Base private key
     * @throws FetchError<400, types.BaseGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.BaseGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BaseGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseGenerateAddressPrivateKey(body: types.BaseGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.BaseGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/base/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based web3 driver to connect directly to the Base
     * node provided by Tatum.
     * To learn more about Base Web3, visit the <a href="https://base.network/"
     * target="_blank">Base developers' guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.BaseWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.BaseWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BaseWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseWeb3Driver(body: types.BaseWeb3DriverBodyParam, metadata: types.BaseWeb3DriverMetadataParam): Promise<FetchResponse<200, types.BaseWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/base/block/current</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets the current Base block number. This is the
     * number of the latest block in the blockchain.</p>
     *
     * @summary Get current block number
     * @throws FetchError<401, types.BaseGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BaseGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseGetCurrentBlock(): Promise<FetchResponse<200, types.BaseGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/base/block/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets an Base block-by-block hash or block
     * number.</p>
     *
     * @summary Get Base block by hash
     * @throws FetchError<400, types.BaseGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.BaseGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BaseGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseGetBlock(metadata: types.BaseGetBlockMetadataParam): Promise<FetchResponse<200, types.BaseGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/base/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of <b>BASE</b> of an Base account.</p>
     * <p>To get the balance of <b>tokens</b>, use the APIs for getting the balance of <a
     * href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20GetBalanceAddress"
     * target="_blank">fungible tokens (ERC-20)</a> and <a
     * href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetTokensByAddressErc721"
     * target="_blank">NFTs (ERC-721)</a>.</p>
     *
     *
     * @summary Get the BASE balance of an Base account
     * @throws FetchError<400, types.BaseGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.BaseGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BaseGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseGetBalance(metadata: types.BaseGetBalanceMetadataParam): Promise<FetchResponse<200, types.BaseGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/base/transaction/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Base transaction by transaction hash.</p>
     *
     *
     * @summary Get Base Transaction
     * @throws FetchError<400, types.BaseGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.BaseGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.BaseGetTransactionResponse404> Transaction not found.
     * @throws FetchError<500, types.BaseGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseGetTransaction(metadata: types.BaseGetTransactionMetadataParam): Promise<FetchResponse<200, types.BaseGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/base/transaction/count/{address}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Base transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Base transactions
     * @throws FetchError<400, types.BaseGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.BaseGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BaseGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseGetTransactionCount(metadata: types.BaseGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.BaseGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/base/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send BASE or Tatum-supported fungible tokens (ERC-20) from account to account.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> Sending the fungible tokens is
     * supported only on the mainnet.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending BASE, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     *
     *
     * @summary Send BASE or fungible tokens (ERC-20) from account to account
     * @throws FetchError<400, types.BaseBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.BaseBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BaseBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BaseBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseBlockchainTransfer(body: types.BaseBlockchainTransferBodyParam): Promise<FetchResponse<200, types.BaseBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/base/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Base.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>If <b>caller</b> field is present instead of the private key, Tatum will sign the
     * transaction with the managed private key connected to the caller address. This is
     * applicable only for paid mainnet plans and all testnet plans. Keep in mind that the
     * caller address must have enough access right to perform the action in the smart contract
     * method.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     *
     *
     * @summary Invoke a method in a smart contract on Base
     * @throws FetchError<400, types.BaseBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.BaseBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BaseBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BaseBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseBlockchainSmartContractInvocation(body: types.BaseBlockchainSmartContractInvocationBodyParam): Promise<FetchResponse<200, types.BaseBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/base/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Base blockchain.</p>
     *
     *
     * @summary Broadcast signed Base transaction
     * @throws FetchError<400, types.BaseBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.BaseBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BaseBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BaseBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    baseBroadcast(body: types.BaseBroadcastBodyParam): Promise<FetchResponse<200, types.BaseBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/celo/wallet</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can
     * generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special
     * words in defined order and can restore access to all generated addresses and private
     * keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret
     * value, which should never be revealed</li><li>Public Key - public address to be
     * published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum
     * follows BIP44 specification and generates for Celo wallet with derivation path
     * m'/44'/52752'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Celo wallet.</p>
     *
     *
     * @summary Generate Celo wallet
     * @throws FetchError<400, types.CeloGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.CeloGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.CeloGenerateWalletResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.CeloGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoGenerateWallet(metadata?: types.CeloGenerateWalletMetadataParam): Promise<FetchResponse<200, types.CeloGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/celo/address/{xpub}/{index}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate Celo account deposit address from Extended public key. Deposit address is
     * generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate Celo account address from Extended public key
     * @throws FetchError<400, types.CeloGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.CeloGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CeloGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoGenerateAddress(metadata: types.CeloGenerateAddressMetadataParam): Promise<FetchResponse<200, types.CeloGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/celo/wallet/priv</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate private key of address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate Celo private key
     * @throws FetchError<400, types.CeloGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.CeloGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CeloGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoGenerateAddressPrivateKey(body: types.CeloGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.CeloGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/celo/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the Celo
     * node provided by Tatum.
     * To learn more about Celo Web3, visit the <a href="https://explorer.celo.org/api-docs"
     * target="_blank">Celo developer's guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.CeloWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.CeloWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CeloWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoWeb3Driver(body: types.CeloWeb3DriverBodyParam, metadata: types.CeloWeb3DriverMetadataParam): Promise<FetchResponse<200, types.CeloWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/celo/block/current</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Celo current block number. This is the number of the latest block in the
     * blockchain.</p>
     *
     *
     * @summary Get current block number
     * @throws FetchError<401, types.CeloGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CeloGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoGetCurrentBlock(): Promise<FetchResponse<200, types.CeloGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/celo/block/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Celo block by block hash or block number.</p>
     *
     *
     * @summary Get Celo block by hash
     * @throws FetchError<400, types.CeloGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.CeloGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CeloGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoGetBlock(metadata: types.CeloGetBlockMetadataParam): Promise<FetchResponse<200, types.CeloGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/celo/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Celo account balance in ETH. This method does not prints any balance of the ERC20
     * or ERC721 tokens on the account.</p>
     *
     *
     * @summary Get Celo Account balance
     * @throws FetchError<400, types.CeloGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.CeloGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CeloGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoGetBalance(metadata: types.CeloGetBalanceMetadataParam): Promise<FetchResponse<200, types.CeloGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/celo/account/transaction/{address}</p>
     * <p>This endpoint is deprecated. Do not use it.</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Celo transactions by address. This includes incoming and outgoing transactions
     * for the address.</p>
     *
     *
     * @summary Get Celo transactions by address
     * @throws FetchError<400, types.CeloGetTransactionByAddressResponse400> Bad Request
     * @throws FetchError<401, types.CeloGetTransactionByAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CeloGetTransactionByAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoGetTransactionByAddress(metadata: types.CeloGetTransactionByAddressMetadataParam): Promise<FetchResponse<200, types.CeloGetTransactionByAddressResponse200>>;
    /**
     * <p style="display: none">/v3/celo/transaction/{hash}</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Get Celo transaction by transaction hash.</p>
     *
     *
     * @summary Get Celo Transaction
     * @throws FetchError<400, types.CeloGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.CeloGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.CeloGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.CeloGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoGetTransaction(metadata: types.CeloGetTransactionMetadataParam): Promise<FetchResponse<200, types.CeloGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/celo/transaction/count/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get a number of outgoing Celo transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Celo transactions
     * @throws FetchError<400, types.CeloGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.CeloGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.CeloGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoGetTransactionCount(metadata: types.CeloGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.CeloGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/celo/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send Celo, cUSD or Tatum supported ERC20 token from account to account.<br/><br/>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending CELO, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send Celo / ERC20 from account to account
     * @throws FetchError<400, types.CeloBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.CeloBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.CeloBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.CeloBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoBlockchainTransfer(body: types.CeloBlockchainTransferBodyParam): Promise<FetchResponse<200, types.CeloBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/celo/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Celo.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Invoke a method in a smart contract on Celo
     * @throws FetchError<400, types.CeloBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.CeloBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.CeloBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.CeloBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoBlockchainSmartContractInvocation(body: types.CeloBlockchainSmartContractInvocationBodyParam): Promise<FetchResponse<200, types.CeloBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/celo/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Celo blockchain. This method is used internally from
     * Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed Celo transaction
     * @throws FetchError<400, types.CeloBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.CeloBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.CeloBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.CeloBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    celoBroadcast(body: types.CeloBroadcastBodyParam): Promise<FetchResponse<200, types.CeloBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/egld/wallet</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>The Elrond Address format is bech32, specified by the BIP 0173. The address always
     * starts with an erd1. It is very convenient and secure, since it can generate 2^31
     * addresses from 1 mnemonic phrase.
     * Mnemonic phrase consists of 24 special words in defined order and can restore access to
     * all generated addresses and private keys.
     * <br/>
     * Each address is identified by 3 main values:
     * <ul><li>Private Key - your secret value, which should never be revealed</li>
     * <li>Public Key - public address to be published</li>
     * <li>Derivation index - index of generated address</li></ul>
     * </p>
     * <p>Tatum follows BIP44 specification and generates for EGLD wallet with derivation path
     * m'/44'/508'/0'/0'.
     * More about BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible EGLD wallet.</p>
     *
     *
     * @summary Generate EGLD wallet
     * @throws FetchError<400, types.EgldGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.EgldGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EgldGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldGenerateWallet(metadata?: types.EgldGenerateWalletMetadataParam): Promise<FetchResponse<200, types.EgldGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/egld/address/{mnemonic}/{index}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate EGLD account deposit address from mnemonic phrase. Deposit address is
     * generated for the specific
     * index - each mnemonic phrase can generate up to 2^31 addresses starting from index 0
     * until 2^31.</p>
     *
     *
     * @summary Generate EGLD account address from mnemonic
     * @throws FetchError<400, types.EgldGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.EgldGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EgldGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldGenerateAddress(metadata: types.EgldGenerateAddressMetadataParam): Promise<FetchResponse<200, types.EgldGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/egld/wallet/priv</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate private key of address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate EGLD private key
     * @throws FetchError<400, types.EgldGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.EgldGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EgldGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldGenerateAddressPrivateKey(body: types.EgldGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.EgldGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/egld/node/{xApiKey}/\*</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based driver to connect directly to the EGLD node
     * provided by Tatum.
     * To learn more about EGLD, visit the <a
     * href="https://docs.elrond.com/sdk-and-tools/rest-api/nodes/" target="_blank">EGLD
     * developer's guide</a>.</p>
     *
     *
     * @summary Node HTTP driver
     * @throws FetchError<400, types.EgldNodePostResponse400> Bad Request
     * @throws FetchError<401, types.EgldNodePostResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EgldNodePostResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldNodePost(body: types.EgldNodePostBodyParam, metadata: types.EgldNodePostMetadataParam): Promise<FetchResponse<200, types.EgldNodePostResponse200>>;
    /**
     * <p style="display: none">/v3/egld/node/{xApiKey}/\*</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based driver to connect directly to the EGLD node
     * provided by Tatum.
     * To learn more about EGLD, visit the <a
     * href="https://docs.elrond.com/sdk-and-tools/rest-api/nodes/" target="_blank">EGLD
     * developer's guide</a>.</p>
     *
     *
     * @summary Node HTTP driver
     * @throws FetchError<400, types.EgldNodeGetResponse400> Bad Request
     * @throws FetchError<401, types.EgldNodeGetResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EgldNodeGetResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldNodeGet(metadata: types.EgldNodeGetMetadataParam): Promise<FetchResponse<200, types.EgldNodeGetResponse200>>;
    /**
     * <p style="display: none">/v3/egld/block/current</p>
     * <h4>1 credit per API call.</h4><br/> <p>Get EGLD current block number. This is the
     * number of the latest block in the blockchain.</p>
     *
     * @summary Get current block number
     * @throws FetchError<401, types.EGldGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EGldGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    eGldGetCurrentBlock(): Promise<FetchResponse<200, types.EGldGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/egld/block/{hash}</p>
     * <h4>1 credit per API call.</h4><br/> <p>Get EGLD block by block hash or block number. <a
     * href='https://docs.elrond.com/sdk-and-tools/rest-api/blocks/' target='_blank'> EGLD docs
     * </a></p>
     *
     * @summary Get EGLD block by hash
     * @throws FetchError<400, types.EgldGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.EgldGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EgldGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldGetBlock(metadata: types.EgldGetBlockMetadataParam): Promise<FetchResponse<200, types.EgldGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/egld/account/balance/{address}</p>
     * <h4>1 credit per API call.</h4><br/> <p>Get account balance in EGLD.</p>
     *
     * @summary Get EGLD Account balance
     * @throws FetchError<400, types.EgldGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.EgldGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EgldGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldGetBalance(metadata: types.EgldGetBalanceMetadataParam): Promise<FetchResponse<200, types.EgldGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/egld/transaction/{hash}</p>
     * <h4>1 credit per API call.</h4><br/> <p>Get EGLD transaction by transaction hash. Detail
     * result please find here <a
     * href='https://docs.elrond.com/sdk-and-tools/rest-api/transactions/#get-transaction'
     * target='_blank'> EGLD docs </a></p>
     *
     * @summary Get EGLD Transaction
     * @throws FetchError<400, types.EgldGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.EgldGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.EgldGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.EgldGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldGetTransaction(metadata: types.EgldGetTransactionMetadataParam): Promise<FetchResponse<200, types.EgldGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/egld/transaction/address/{address}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>This endpoint allows one to retrieve the latest 20 transactions sent from an
     * address.</p>
     *
     *
     * @summary Get count of outgoing EGLD transactions
     * @throws FetchError<400, types.EgldGetTransactionAddressResponse400> Bad Request
     * @throws FetchError<401, types.EgldGetTransactionAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EgldGetTransactionAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldGetTransactionAddress(metadata: types.EgldGetTransactionAddressMetadataParam): Promise<FetchResponse<200, types.EgldGetTransactionAddressResponse200>>;
    /**
     * <p style="display: none">/v3/egld/transaction/count/{address}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing EGLD transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing EGLD transactions
     * @throws FetchError<400, types.EgldGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.EgldGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.EgldGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldGetTransactionCount(metadata: types.EgldGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.EgldGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/egld/transaction</p>
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send EGLD from account to account.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and loss of funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on devnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Send EGLD from account to account
     * @throws FetchError<400, types.EgldBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.EgldBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.EgldBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.EgldBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldBlockchainTransfer(body: types.EgldBlockchainTransferBodyParam): Promise<FetchResponse<200, types.EgldBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/egld/broadcast</p>
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to EGLD blockchain. This method is used internally from
     * Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed EGLD transaction
     * @throws FetchError<400, types.EgldBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.EgldBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.EgldBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.EgldBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    egldBroadcast(body: types.EgldBroadcastBodyParam): Promise<FetchResponse<200, types.EgldBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/flow/wallet</p>
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very
     * convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase.
     * Mnemonic phrase consists of 24 special words in defined order and can restore access to
     * all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value, which should never be
     * revealed</li><li>Public Key - public address to be published</li><li>Derivation index -
     * index of generated address</li></ul></p><p>Tatum follows BIP44 specification and
     * generates for Dogecoin wallet with derivation path m'/44'/3'/0'/0. More about BIP44 HD
     * wallets can be found here - <a target="_blank"
     * href="https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki">https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Dogecoin wallet.</p>
     *
     *
     * @summary Generate Flow wallet
     * @throws FetchError<400, types.FlowGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.FlowGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlowGenerateWalletResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlowGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowGenerateWallet(metadata?: types.FlowGenerateWalletMetadataParam): Promise<FetchResponse<200, types.FlowGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/flow/address/{xpub}/{index}</p>
     * <h4>1 credit for GET operation + 300 credits per address.</h4><br/>
     * <p>Generate Flow address from Extended public key. This operation internally creates
     * public key and assigns it to the newly created address on the blockchain.
     * There is minimal amount, which must be sent to the FLOW address during creation - 0.001
     * FLOW, which will be used from Tatum service account.<br/>
     * <b>This operation is allowed on any Testnet plan and only on Paid Mainnet plans.</b>
     * Public key is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Flow address from Extended public key
     * @throws FetchError<400, types.FlowGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.FlowGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlowGenerateAddressResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlowGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowGenerateAddress(metadata: types.FlowGenerateAddressMetadataParam): Promise<FetchResponse<200, types.FlowGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/flow/pubkey/{xpub}/{index}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate Flow public key from Extended public key. This key is added to the address
     * on the blockchain and can control the funds there. Public key is generated for the
     * specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Flow public key from Extended public key
     * @throws FetchError<400, types.FlowGeneratePubKeyResponse400> Bad Request
     * @throws FetchError<401, types.FlowGeneratePubKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlowGeneratePubKeyResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlowGeneratePubKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowGeneratePubKey(metadata: types.FlowGeneratePubKeyMetadataParam): Promise<FetchResponse<200, types.FlowGeneratePubKeyResponse200>>;
    /**
     * <p style="display: none">/v3/flow/wallet/priv</p>
     * <h4>2 credits per API call.</h4><br/>
     * <p>Generate private key for address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Flow private key
     * @throws FetchError<400, types.FlowGeneratePubKeyPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.FlowGeneratePubKeyPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlowGeneratePubKeyPrivateKeyResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlowGeneratePubKeyPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowGeneratePubKeyPrivateKey(body: types.FlowGeneratePubKeyPrivateKeyBodyParam): Promise<FetchResponse<200, types.FlowGeneratePubKeyPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/flow/block/current</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Flow current block number.</p>
     *
     * @summary Get Flow current block number
     * @throws FetchError<401, types.FlowGetBlockChainInfoResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlowGetBlockChainInfoResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlowGetBlockChainInfoResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowGetBlockChainInfo(): Promise<FetchResponse<200, types.FlowGetBlockChainInfoResponse200>>;
    /**
     * <p style="display: none">/v3/flow/block/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Flow Block detail by block hash or
     * height.</p>
     *
     * @summary Get Flow Block by hash or height
     * @throws FetchError<400, types.FlowGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.FlowGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.FlowGetBlockResponse404> Block not found.
     * @throws FetchError<500, types.FlowGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowGetBlock(metadata: types.FlowGetBlockMetadataParam): Promise<FetchResponse<200, types.FlowGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/flow/block/events</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Flow events from block.</p>
     *
     * @summary Get Flow events from blocks
     * @throws FetchError<400, types.FlowGetBlockEventsResponse400> Bad Request
     * @throws FetchError<401, types.FlowGetBlockEventsResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.FlowGetBlockEventsResponse404> Block not found.
     * @throws FetchError<500, types.FlowGetBlockEventsResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowGetBlockEvents(metadata: types.FlowGetBlockEventsMetadataParam): Promise<FetchResponse<200, types.FlowGetBlockEventsResponse200>>;
    /**
     * <p style="display: none">/v3/flow/transaction/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Flow Transaction detail by transaction
     * hash.</p>
     *
     * @summary Get Flow Transaction by hash
     * @throws FetchError<400, types.FlowGetRawTransactionResponse400> Bad Request
     * @throws FetchError<401, types.FlowGetRawTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlowGetRawTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlowGetRawTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowGetRawTransaction(metadata: types.FlowGetRawTransactionMetadataParam): Promise<FetchResponse<200, types.FlowGetRawTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/flow/account/{address}</p>
     * <h4>1 credit per API call.</h4><br/><p>Get Flow account details.</p>
     *
     * @summary Get the balance of a Flow account
     * @throws FetchError<400, types.FlowGetAccountResponse400> Bad Request
     * @throws FetchError<401, types.FlowGetAccountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlowGetAccountResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlowGetAccountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowGetAccount(metadata: types.FlowGetAccountMetadataParam): Promise<FetchResponse<200, types.FlowGetAccountResponse200>>;
    /**
     * <p style="display: none">/v3/flow/transaction</p>
     * <h4>100 credits per API call.</h4><br/>
     * <p>Send Flow or FUSD to blockchain addresses. Tatum covers the fee connected to the
     * transaction costs in subscription credits. This operation can be done on mainnet only
     * for paid plans.<br/>
     * There are two possibilites how the transaction on the blockchain can be created:
     * <ul>
     * <li>Using mnemonic and index - private key is generated based on the index in the
     * mnemonic.</li>
     * <li>Using secret - private keys is entered manually.</li>
     * </ul><br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and losing funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Send Flow to blockchain addresses
     * @throws FetchError<400, types.FlowTransferBlockchainResponse400> Bad Request
     * @throws FetchError<401, types.FlowTransferBlockchainResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlowTransferBlockchainResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlowTransferBlockchainResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowTransferBlockchain(body: types.FlowTransferBlockchainBodyParam): Promise<FetchResponse<200, types.FlowTransferBlockchainResponse200>>;
    /**
     * <p style="display: none">/v3/flow/transaction/custom</p>
     * <h4>100 credits per API call.</h4><br/>
     * <p>Send arbitrary blockchain transaction to FLOW blockchain. Tatum covers the fee
     * connected to the transaction costs in subscription credits. This operation can be done
     * on mainnet only for paid plans.<br/>
     * There are two possibilites how the transaction on the blockchain can be created:
     * <ul>
     * <li>Using mnemonic and index - private key is generated based on the index in the
     * mnemonic.</li>
     * <li>Using secret - private keys is entered manually.</li>
     * </ul><br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and losing funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Send arbitrary transaction to blockchain
     * @throws FetchError<400, types.FlowTransferCustomBlockchainResponse400> Bad Request
     * @throws FetchError<401, types.FlowTransferCustomBlockchainResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlowTransferCustomBlockchainResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlowTransferCustomBlockchainResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowTransferCustomBlockchain(body: types.FlowTransferCustomBlockchainBodyParam): Promise<FetchResponse<200, types.FlowTransferCustomBlockchainResponse200>>;
    /**
     * <p style="display: none">/v3/flow/account</p>
     * <h4>100 credits per API call. Tatum covers the fee connected to the transaction costs in
     * subscription credits. This operation can be done on mainnet only for paid
     * plans.</h4><br/>
     * <p>Create Flow blockchain addresses from public key. This will generate address on the
     * blockchain with public key. Private key for that public key can be used for signing
     * transaction.
     * There are two possibilites how the transaction on the blockchain can be created:
     * <ul>
     * <li>Using mnemonic and index - private key is generated based on the index in the
     * mnemonic.</li>
     * <li>Using secret - private keys is entered manually.</li>
     * </ul><br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and losing funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Create Flow address from public key
     * @throws FetchError<400, types.FlowCreateAddressFromPubKeyResponse400> Bad Request
     * @throws FetchError<401, types.FlowCreateAddressFromPubKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlowCreateAddressFromPubKeyResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlowCreateAddressFromPubKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowCreateAddressFromPubKey(body: types.FlowCreateAddressFromPubKeyBodyParam): Promise<FetchResponse<200, types.FlowCreateAddressFromPubKeyResponse200>>;
    /**
     * <p style="display: none">/v3/flow/account</p>
     * <h4>100 credits per API call. Tatum covers the fee connected to the transaction costs in
     * subscription credits. This operation can be done on mainnet only for paid
     * plans.</h4><br/>
     * <p>Add public key to existing Flow blockchain addresses. Private key for that public key
     * can be used for signing transaction.
     * There are two possibilites how the transaction on the blockchain can be created:
     * <ul>
     * <li>Using mnemonic and index - private key is generated based on the index in the
     * mnemonic.</li>
     * <li>Using secret - private keys is entered manually.</li>
     * </ul><br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and losing funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Add public key to Flow address
     * @throws FetchError<400, types.FlowAddPubKeyToAddressResponse400> Bad Request
     * @throws FetchError<401, types.FlowAddPubKeyToAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.FlowAddPubKeyToAddressResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.FlowAddPubKeyToAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    flowAddPubKeyToAddress(body: types.FlowAddPubKeyToAddressBodyParam): Promise<FetchResponse<200, types.FlowAddPubKeyToAddressResponse200>>;
    /**
     * <p style="display: none">/v3/tron/wallet</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can
     * generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special
     * words in defined order and can restore access to all generated addresses and private
     * keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret
     * value, which should never be revealed</li><li>Public Key - public address to be
     * published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum
     * follows BIP44 specification and generates for Bitcoin wallet with derivation path
     * m'/44'/195'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/tron/bips/blob/master/bip-0044.mediawiki</a>.
     *         Generate BIP44 compatible Tron wallet.</p>
     *
     *
     * @summary Generate a TRON wallet
     * @throws FetchError<400, types.GenerateTronwalletResponse400> Bad Request
     * @throws FetchError<401, types.GenerateTronwalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.GenerateTronwalletResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.GenerateTronwalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    generateTronwallet(metadata?: types.GenerateTronwalletMetadataParam): Promise<FetchResponse<200, types.GenerateTronwalletResponse200>>;
    /**
     * <p style="display: none">/v3/tron/address/{xpub}/{index}</p>
     * <p><b>5 credits per API call</b></p>
     * <p>Generate a TRON address from the extended public key of the wallet. The address is
     * generated for the specific index - each extended public key can generate up to 2^32
     * addresses with the index starting from 0 up to 2^31.</p>
     *
     *
     * @summary Generate a TRON address from the wallet's extended public key
     * @throws FetchError<400, types.TronGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.TronGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronGenerateAddressResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronGenerateAddress(metadata: types.TronGenerateAddressMetadataParam): Promise<FetchResponse<200, types.TronGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/tron/wallet/priv</p>
     * <p><b>10 credits per API call</b></p>
     * <p>Generate private key for address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate the private key for a TRON address
     * @throws FetchError<400, types.TronGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.TronGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronGenerateAddressPrivateKeyResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronGenerateAddressPrivateKey(body: types.TronGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.TronGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/tron/info</p>
     * <p><b>5 credits per API call</b></p>
     * <p>Get current Tron block.</p>
     *
     *
     * @summary Get the current TRON block
     * @throws FetchError<401, types.TronGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronGetCurrentBlockResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronGetCurrentBlock(): Promise<FetchResponse<200, types.TronGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/tron/block/{hash}</p>
     * <p><b>5 credits per API call</b></p>
     * <p>Get Tron block by hash or height.</p>
     *
     *
     * @summary Get a TRON block by its hash or height
     * @throws FetchError<400, types.TronGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.TronGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronGetBlockResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronGetBlock(metadata: types.TronGetBlockMetadataParam): Promise<FetchResponse<200, types.TronGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/tron/account/{address}</p>
     * <p><b>5 credits per API call</b></p>
     * <p>Get Tron account by address.</p>
     *
     *
     * @summary Get the TRON account by its address
     * @throws FetchError<400, types.TronGetAccountResponse400> Bad Request
     * @throws FetchError<401, types.TronGetAccountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronGetAccountResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronGetAccountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronGetAccount(metadata: types.TronGetAccountMetadataParam): Promise<FetchResponse<200, types.TronGetAccountResponse200>>;
    /**
     * <p style="display: none">/v3/tron/freezeBalance</p>
     * <p><b>10 credits per API call</b></p>
     * <p>Freeze Tron assets on the address. By freezing assets, you can obtain energy or
     * bandwidth to perform transactions.</p>
     * <p><b>Signing a transaction</b><br/>
     * When freezing the balance, you are charged a fee for the transaction, and you must sign
     * the transaction with the private key of the blockchain address from which the fee will
     * be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Freeze the balance of a TRON account
     * @throws FetchError<400, types.TronFreezeResponse400> Bad Request
     * @throws FetchError<401, types.TronFreezeResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronFreezeResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronFreezeResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronFreeze(body: types.TronFreezeBodyParam): Promise<FetchResponse<200, types.TronFreezeResponse200>>;
    /**
     * <p style="display: none">/v3/tron/unfreezeBalance</p>
     * <p><b>10 credits per API call</b></p>
     * <p>Unfreeze Tron assets on the address. By unfreezing assets, you can unlock your staked
     * TRX.</p>
     * <p><b>Signing a transaction</b><br/>
     * When unfreezing the balance, you are charged a fee for the transaction, and you must
     * sign the transaction with the private key of the blockchain address from which the fee
     * will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Unfreeze the balance of a TRON account
     * @throws FetchError<400, types.TronUnfreezeResponse400> Bad Request
     * @throws FetchError<401, types.TronUnfreezeResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronUnfreezeResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronUnfreezeResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronUnfreeze(body: types.TronUnfreezeBodyParam): Promise<FetchResponse<200, types.TronUnfreezeResponse200>>;
    /**
     * <p style="display: none">/v3/tron/transaction/account/{address}</p>
     * <p><b>5 credits per API call</b></p>
     * <p>Get all transactions for a TRON account.</p>
     * <p>This API returns up to 200 transactions in one API call. If there are more than 200
     * transactions for the TRON account, the response body will contain the <code>next</code>
     * parameter with the fingerprint of the transaction that follows the last
     * (200<sup>th</sup>) transaction in the returned list.</p>
     * <p>To get the next 200 transactions, make another call using this API, but this time add
     * the <code>next</code> parameter the endpoint URL and set it to the transaction
     * fingerprint from the <code>next</code> parameter in the response, for example:</p>
     * <p><code>https://api.tatum.io/v3/tron/transaction/account/{address}?next=81d0524acf5967f3b361e03fd7d141ab511791cd7aad7ae406c4c8d408290991</code></p>
     *
     *
     * @summary Get all transactions for a TRON account
     * @throws FetchError<400, types.TronAccountTxResponse400> Bad Request
     * @throws FetchError<401, types.TronAccountTxResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronAccountTxResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronAccountTxResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronAccountTx(metadata: types.TronAccountTxMetadataParam): Promise<FetchResponse<200, types.TronAccountTxResponse200>>;
    /**
     * <p style="display: none">/v3/tron/transaction/account/{address}/trc20</p>
     * <p><b>5 credits per API call</b></p>
     * <p>Get TRC-20 transactions for a TRON account.</p>
     * <p>This API returns up to 200 transactions in one API call. If there are more than 200
     * transactions for the TRON account, the response body will contain the <code>next</code>
     * parameter with the fingerprint of the transaction that follows the last
     * (200<sup>th</sup>) transaction in the returned list.</p>
     * <p>To get the next 200 transactions, make another call using this API, but this time add
     * the <code>next</code> parameter the endpoint URL and set it to the transaction
     * fingerprint from the <code>next</code> parameter in the response, for example:</p>
     * <p><code>https://api.tatum.io/v3/tron/transaction/account/{address}/trc20?next=81d0524acf5967f3b361e03fd7d141ab511791cd7aad7ae406c4c8d408290991</code></p>
     *
     *
     * @summary Get TRC-20 transactions for a TRON account
     * @throws FetchError<400, types.TronAccountTx20Response400> Bad Request
     * @throws FetchError<401, types.TronAccountTx20Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronAccountTx20Response403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronAccountTx20Response500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronAccountTx20(metadata: types.TronAccountTx20MetadataParam): Promise<FetchResponse<200, types.TronAccountTx20Response200>>;
    /**
     * <p style="display: none">/v3/tron/transaction</p>
     * <p><b>10 credits per API call</b></p>
     * <p>Send an amount in TRX from address to address.</p>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending TRX to a TRON account, you are charged a fee for the transaction, and
     * you must sign the transaction with the private key of the blockchain address from which
     * the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send TRX to a TRON account
     * @throws FetchError<400, types.TronTransferResponse400> Bad Request
     * @throws FetchError<401, types.TronTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronTransfer(body: types.TronTransferBodyParam): Promise<FetchResponse<200, types.TronTransferResponse200>>;
    /**
     * <p style="display: none">/v3/tron/trc10/transaction</p>
     * <p><b>10 credits per API call</b></p>
     * <p>Send TRC-10 tokens from address to address.</p>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending TRC-10 tokens to a TRON account, you are charged a fee for the
     * transaction, and you must sign the transaction with the private key of the blockchain
     * address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send TRC-10 tokens to a TRON account
     * @throws FetchError<400, types.TronTransferTrc10Response400> Bad Request
     * @throws FetchError<401, types.TronTransferTrc10Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronTransferTrc10Response403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronTransferTrc10Response500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronTransferTrc10(body: types.TronTransferTrc10BodyParam): Promise<FetchResponse<200, types.TronTransferTrc10Response200>>;
    /**
     * <p style="display: none">/v3/tron/trc20/transaction</p>
     * <p><b>10 credits per API call</b></p>
     * <p>Send TRC-20 tokens from address to address.</p>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending TRC-20 tokens to a TRON account, you are charged a fee for the
     * transaction, and you must sign the transaction with the private key of the blockchain
     * address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send TRC-20 tokens to a TRON account
     * @throws FetchError<400, types.TronTransferTrc20Response400> Bad Request
     * @throws FetchError<401, types.TronTransferTrc20Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronTransferTrc20Response403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronTransferTrc20Response500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronTransferTrc20(body: types.TronTransferTrc20BodyParam): Promise<FetchResponse<200, types.TronTransferTrc20Response200>>;
    /**
     * <p style="display: none">/v3/tron/trc10/deploy</p>
     * <p><b>10 credits per API call</b></p>
     * <p>Create a TRON TRC-10 token.</p>
     * <p>One TRON account can create only one TRC-10 token. The whole supply of the token is
     * transferred to the issuer's account 100 seconds after the token has been created.</p>
     * <p><b>Signing a transaction</b><br/>
     * When creating a TRC-10 token, you are charged a fee for the transaction, and you must
     * sign the transaction with the private key of the blockchain address from which the fee
     * will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Create a TRC-10 token
     * @throws FetchError<400, types.TronCreateTrc10Response400> Bad Request
     * @throws FetchError<401, types.TronCreateTrc10Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronCreateTrc10Response403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronCreateTrc10Response500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronCreateTrc10(body: types.TronCreateTrc10BodyParam): Promise<FetchResponse<200, types.TronCreateTrc10Response200>>;
    /**
     * <p style="display: none">/v3/tron/trc10/detail/{idOrOwnerAddress}</p>
     * <p><b>5 credits per API call</b></p>
     * <p>Get information about a TRON TRC-10 token.</p>
     *
     *
     * @summary Get information about a TRC-10 token
     * @throws FetchError<400, types.TronTrc10DetailResponse400> Bad Request
     * @throws FetchError<401, types.TronTrc10DetailResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronTrc10DetailResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronTrc10DetailResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronTrc10Detail(metadata: types.TronTrc10DetailMetadataParam): Promise<FetchResponse<200, types.TronTrc10DetailResponse200>>;
    /**
     * <p style="display: none">/v3/tron/trc20/deploy</p>
     * <p><b>10 credits per API call</b></p>
     * <p>Create a TRON TRC-20 capped token. A capped TRC20 token is a type of token on the
     * TRON blockchain that has a preset limit on the total number of tokens that can be
     * created. This limit is specified during the token creation process and cannot be
     * exceeded. Once the limit is reached, no more tokens can be minted. This feature helps to
     * ensure the scarcity and value of the token and can provide investors with a sense of
     * security. It is a popular choice for fundraising, as it allows for a predetermined
     * amount of funds to be raised through the sale of tokens, and any excess tokens that are
     * not sold are simply not minted.</p>
     * <p><b>Signing a transaction</b><br/>
     * When creating a TRC-20 token, you are charged a fee for the transaction, and you must
     * sign the transaction with the private key of the blockchain address from which the fee
     * will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Create a TRC-20 token
     * @throws FetchError<400, types.TronCreateTrc20Response400> Bad Request
     * @throws FetchError<401, types.TronCreateTrc20Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronCreateTrc20Response403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronCreateTrc20Response500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronCreateTrc20(body: types.TronCreateTrc20BodyParam): Promise<FetchResponse<200, types.TronCreateTrc20Response200>>;
    /**
     * <p style="display: none">/v3/tron/transaction/{hash}</p>
     * <p><b>5 credits per API call</b></p>
     * <p>Get Tron transaction by hash.</p>
     *
     *
     * @summary Get a TRON transaction by its hash
     * @throws FetchError<400, types.TronGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.TronGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronGetTransaction(metadata: types.TronGetTransactionMetadataParam): Promise<FetchResponse<200, types.TronGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/tron/broadcast</p>
     * <p><b>5 credits per API call</b></p>
     * <p>Broadcast Tron transaction. This method is used internally from Tatum client
     * libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast a TRON transaction
     * @throws FetchError<400, types.TronBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.TronBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.TronBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.TronBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    tronBroadcast(body: types.TronBroadcastBodyParam): Promise<FetchResponse<200, types.TronBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/ada/info</p>
     * <p><b>You can work with Cardano by <a
     * href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver"
     * target="_blank">connecting directly to a blockchain node provided by
     * Tatum</a>.</b></p><br/><h4>1 credit per API call.</h4><p>Gets Ada blockchain
     * information. Obtains basic info like the testnet / mainnet version of the chain, the
     * current block number and its hash.</p>
     *
     * @summary Get Blockchain information
     * @throws FetchError<401, types.AdaGetBlockChainInfoResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AdaGetBlockChainInfoResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.AdaGetBlockChainInfoResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    adaGetBlockChainInfo(): Promise<FetchResponse<200, types.AdaGetBlockChainInfoResponse200>>;
    /**
     * <p style="display: none">/v3/ada/wallet</p>
     * <p><b>
     * You can work with Cardano by <a
     * href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver"
     * target="_blank">connecting directly to a blockchain node provided by
     * Tatum</a>.</b></p><br/>
     * <h4>1 credit per API call.</h4><p>Tatum supports BIP44 HD wallets. Because they can
     * generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A
     * mnemonic phrase consists of 24 special words in a defined order and can restore access
     * to all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value, which should never be
     * revealed</li><li>Public Key - public address to be published</li><li>Derivation index -
     * index of generated address</li></ul></p><p>Tatum follows BIP44 specification and
     * generates for ADA wallet with derivation path m/1852'/1815'/0'. More about BIP44 HD
     * wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Ada wallet.</p>
     *
     *
     * @summary Generate Ada wallet
     * @throws FetchError<400, types.AdaGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.AdaGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AdaGenerateWalletResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.AdaGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    adaGenerateWallet(metadata?: types.AdaGenerateWalletMetadataParam): Promise<FetchResponse<200, types.AdaGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/ada/address/{xpub}/{index}</p>
     * <p><b>
     * You can work with Cardano by <a
     * href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver"
     * target="_blank">connecting directly to a blockchain node provided by
     * Tatum</a>.</b></p><br/>
     * <h4>1 credit per API call.</h4>
     * <p>Generates a Ada deposit address from an Extended public key. The deposit address is
     * generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Ada deposit address from Extended public key
     * @throws FetchError<400, types.AdaGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.AdaGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AdaGenerateAddressResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.AdaGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    adaGenerateAddress(metadata: types.AdaGenerateAddressMetadataParam): Promise<FetchResponse<200, types.AdaGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/ada/wallet/priv</p>
     * <p><b>
     * You can work with Cardano by <a
     * href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver"
     * target="_blank">connecting directly to a blockchain node provided by
     * Tatum</a>.</b></p><br/>
     * <h4>1 credit per API call.</h4>
     * <p>Generates a private key for an address from a mnemonic for a given derivation path
     * index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Ada private key
     * @throws FetchError<400, types.AdaGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.AdaGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AdaGenerateAddressPrivateKeyResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.AdaGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    adaGenerateAddressPrivateKey(body: types.AdaGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.AdaGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/ada/block/{hash}</p>
     * <p><b>You can work with Cardano by <a
     * href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver"
     * target="_blank">connecting directly to a blockchain node provided by
     * Tatum</a>.</b></p><br/><h4>1 credit per API call.</h4><p>Gets Ada block detail by block
     * hash or height.</p>
     *
     * @summary Get Block by hash or height
     * @throws FetchError<400, types.AdaGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.AdaGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.AdaGetBlockResponse404> Block not found.
     * @throws FetchError<500, types.AdaGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    adaGetBlock(metadata: types.AdaGetBlockMetadataParam): Promise<FetchResponse<200, types.AdaGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/ada/transaction/{hash}</p>
     * <p><b>You can work with Cardano by <a
     * href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver"
     * target="_blank">connecting directly to a blockchain node provided by
     * Tatum</a>.</b></p><br/><h4>1 credit per API call.</h4><p>Get Ada Transaction detail by
     * transaction hash.</p>
     *
     * @summary Get transaction by hash
     * @throws FetchError<400, types.AdaGetRawTransactionResponse400> Bad Request
     * @throws FetchError<401, types.AdaGetRawTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AdaGetRawTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.AdaGetRawTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    adaGetRawTransaction(metadata: types.AdaGetRawTransactionMetadataParam): Promise<FetchResponse<200, types.AdaGetRawTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/ada/transaction/address/{address}</p>
     * <p><b>You can work with Cardano by <a
     * href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver"
     * target="_blank">connecting directly to a blockchain node provided by
     * Tatum</a>.</b></p><br/><h4>1 credit per API call.</h4><p>Gets a Ada transaction by
     * address.</p>
     *
     * @summary Get transactions by address
     * @throws FetchError<400, types.AdaGetTxByAddressResponse400> Bad Request
     * @throws FetchError<401, types.AdaGetTxByAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AdaGetTxByAddressResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.AdaGetTxByAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    adaGetTxByAddress(metadata: types.AdaGetTxByAddressMetadataParam): Promise<FetchResponse<200, types.AdaGetTxByAddressResponse200>>;
    /**
     * <p style="display: none">/v3/ada/{address}/utxos</p>
     * <p><b>You can work with Cardano by <a
     * href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver"
     * target="_blank">connecting directly to a blockchain node provided by
     * Tatum</a>.</b></p><br/><h4>1 credit per API call.</h4><p>Gets a Ada UTXOs by
     * address.</p>
     *
     * @summary Get UTXOs by address
     * @throws FetchError<400, types.AdaGetUtxoByAddressResponse400> Bad Request
     * @throws FetchError<401, types.AdaGetUtxoByAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AdaGetUtxoByAddressResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.AdaGetUtxoByAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    adaGetUTXOByAddress(metadata: types.AdaGetUtxoByAddressMetadataParam): Promise<FetchResponse<200, types.AdaGetUtxoByAddressResponse200>>;
    /**
     * <p style="display: none">/v3/ada/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send ADA to blockchain addresses.</p>
     * <p>Cardano transactions are based on UTXOs. "UTXO" stands for "Unspent Transaction
     * Output". A UTXO is the amount of ADA that remains at a Cardano address after a
     * cryptocurrency transaction involving this address has been performed. The UTXO can then
     * be used as input for a new cryptocurrency transaction. For more information about the
     * UTXO, see the <a href="https://developer.bitcoin.org/devguide/transactions.html"
     * target="_blank">Bitcoin user documentation</a>.</p>
     * <p>You can build an ADA transaction by one of the following methods:</p>
     * <ul>
     * <li><b>Sending ADA from blockchain addresses</b><br/>The assets are sent from a list of
     * addresses. For each address, the last 100 transactions are scanned for any UTXO to be
     * included in the transaction. For easier control over the assets to be sent, we recommend
     * that you use this method only if you have one address to send the assets from.<br/> To
     * use this method, use the <code>AdaTransactionFromAddress</code> or
     * <code>AdaTransactionFromAddressKMS</code> schema of the request body.</li>
     * <li><b>Sending ADA from UTXOs</b><br/>The assets are sent from a list of UTXOs. Each
     * UTXO is included in the transaction. Use this method if you want to manually calculate
     * the amount to send.<br/> To use this method, use the <code>AdaTransactionFromUTXO</code>
     * or <code>AdaTransactionFromUTXOKMS</code> schema of the request body.</li>
     * </ul>
     * <p>When an UTXO is entered into a transaction, the whole UTXO amount is included and
     * must be spent. For example, address A receives two transactions, T1 with 1 ADA and T2
     * with 2 ADA. A transaction that consumes the UTXOs from both T1 and T2 will have an
     * available amount of 3 ADA to spend:<br/><code>1 ADA (from T1) + 2 ADA (from T2) = 3 ADA
     * (to spend in total)</code></p>
     * <p>You can send the assets to one or multiple recipients in one transaction. If you send
     * the assets to multiple addresses, each address must have its own amount to receive.</p>
     * <p><b>Paying the gas fee and receiving the change</b><br/>
     * When the amount that the recipients should receive is lower than the amount from the
     * UTXOs, the difference between these two amounts is by default used as the gas fee for
     * the transaction. Because this amount may be considerable and you may not want to spend
     * it all on the gas fee, you can explicitly specify the fee amount and the blockchain
     * address where any extra funds remaining after covering the fee will be sent (the
     * <code>fee</code> and <code>changeAddress</code> parameters in the request body,
     * correspondingly).</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending ADA, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send ADA to Cardano addresses
     * @throws FetchError<400, types.AdaTransferBlockchainResponse400> Bad Request
     * @throws FetchError<401, types.AdaTransferBlockchainResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AdaTransferBlockchainResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.AdaTransferBlockchainResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    adaTransferBlockchain(body: types.AdaTransferBlockchainBodyParam): Promise<FetchResponse<200, types.AdaTransferBlockchainResponse200>>;
    /**
     * <p style="display: none">/v3/ada/broadcast</p>
     * <p><b>
     * You can work with Cardano by <a
     * href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver"
     * target="_blank">connecting directly to a blockchain node provided by
     * Tatum</a>.</b></p><br/>
     * <h4>2 credits per API call.</h4>
     * <p>Broadcasts a signed transaction to the Ada blockchain. This method is used internally
     * from Tatum KMS or Tatum Client Libraries.
     * It is possible to create a custom signing mechanism and only use this method for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed Ada transaction
     * @throws FetchError<400, types.AdaBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.AdaBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AdaBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.AdaBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    adaBroadcast(body: types.AdaBroadcastBodyParam): Promise<FetchResponse<200, types.AdaBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/ada/account/{address}</p>
     * <p><b>
     * You can work with Cardano by <a
     * href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver"
     * target="_blank">connecting directly to a blockchain node provided by
     * Tatum</a>.</b></p><br/>
     * <h4>2 credits per API call.</h4>
     * <p>Gets a Ada account by address.</p>
     *
     *
     * @summary Gets a Ada account by address
     * @throws FetchError<400, types.AdaGetAccountResponse400> Bad Request
     * @throws FetchError<401, types.AdaGetAccountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.AdaGetAccountResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.AdaGetAccountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    adaGetAccount(metadata: types.AdaGetAccountMetadataParam): Promise<FetchResponse<200, types.AdaGetAccountResponse200>>;
    /**
     * <p style="display: none">/v3/arb/wallet</p>
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can
     * generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A
     * mnemonic phrase consists of 24 special words in a defined order and can restore access
     * to all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value which should never be
     * revealed</li><li>Public Key - a public address to be published</li><li>Derivation index
     * - an index of generated address</li></ul></p><p>Tatum follows the BIP44 specification
     * and generates for Arb wallets with the derivation path m/44'/60'/0'/0. More about BIP44
     * HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generates a BIP44 compatible Arb wallet.</p>
     *
     *
     * @summary Generate Arb wallet
     * @throws FetchError<400, types.ArbGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.ArbGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.ArbGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    arbGenerateWallet(metadata?: types.ArbGenerateWalletMetadataParam): Promise<FetchResponse<200, types.ArbGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/arb/address/{xpub}/{index}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates an Arb account deposit address from an Extended public key. The deposit
     * address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Arb account address from Extended public key
     * @throws FetchError<400, types.ArbGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.ArbGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.ArbGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    arbGenerateAddress(metadata: types.ArbGenerateAddressMetadataParam): Promise<FetchResponse<200, types.ArbGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/arb/wallet/priv</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates the private key of an address from a mnemonic for a given derivation path
     * index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate Arb private key
     * @throws FetchError<400, types.ArbGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.ArbGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.ArbGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    arbGenerateAddressPrivateKey(body: types.ArbGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.ArbGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/arb/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based web3 driver to connect directly to the Arb
     * node provided by Tatum.
     * To learn more about Arb Web3, visit the <a href="https://arb.network/"
     * target="_blank">Arb developers' guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.ArbWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.ArbWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.ArbWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    arbWeb3Driver(body: types.ArbWeb3DriverBodyParam, metadata: types.ArbWeb3DriverMetadataParam): Promise<FetchResponse<200, types.ArbWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/arb/block/current</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets the current Arb block number. This is the
     * number of the latest block in the blockchain.</p>
     *
     * @summary Get current block number
     * @throws FetchError<401, types.ArbGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.ArbGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    arbGetCurrentBlock(): Promise<FetchResponse<200, types.ArbGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/arb/block/{hash}</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets an Arb block-by-block hash or block
     * number.</p>
     *
     * @summary Get Arb block by hash
     * @throws FetchError<400, types.ArbGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.ArbGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.ArbGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    arbGetBlock(metadata: types.ArbGetBlockMetadataParam): Promise<FetchResponse<200, types.ArbGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/arb/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of <b>ARB</b> of an Arb account.</p>
     * <p>To get the balance of <b>tokens</b>, use the APIs for getting the balance of <a
     * href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20GetBalanceAddress"
     * target="_blank">fungible tokens (ERC-20)</a> and <a
     * href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetTokensByAddressErc721"
     * target="_blank">NFTs (ERC-721)</a>.</p>
     *
     *
     * @summary Get the ARB balance of an Arb account
     * @throws FetchError<400, types.ArbGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.ArbGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.ArbGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    arbGetBalance(metadata: types.ArbGetBalanceMetadataParam): Promise<FetchResponse<200, types.ArbGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/arb/transaction/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Arb transaction by transaction hash.</p>
     *
     *
     * @summary Get Arb Transaction
     * @throws FetchError<400, types.ArbGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.ArbGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<404, types.ArbGetTransactionResponse404> Transaction not found.
     * @throws FetchError<500, types.ArbGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    arbGetTransaction(metadata: types.ArbGetTransactionMetadataParam): Promise<FetchResponse<200, types.ArbGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/arb/transaction/count/{address}</p>
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Arb transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Arb transactions
     * @throws FetchError<400, types.ArbGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.ArbGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.ArbGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    arbGetTransactionCount(metadata: types.ArbGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.ArbGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/arb/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send ETH_ARB or Tatum-supported fungible tokens (ERC-20) from account to account.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> Sending the fungible tokens is
     * supported only on the mainnet.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending ETH_ARB, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     *
     *
     * @summary Send ETH_ARB or fungible tokens (ERC-20) from account to account
     * @throws FetchError<400, types.ArbBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.ArbBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.ArbBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.ArbBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    arbBlockchainTransfer(body: types.ArbBlockchainTransferBodyParam): Promise<FetchResponse<200, types.ArbBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/arb/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Arb blockchain.</p>
     *
     *
     * @summary Broadcast signed Arb transaction
     * @throws FetchError<400, types.ArbBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.ArbBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.ArbBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.ArbBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    arbBroadcast(body: types.ArbBroadcastBodyParam): Promise<FetchResponse<200, types.ArbBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/wallet</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can
     * generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special
     * words in defined order and can restore access to all generated addresses and private
     * keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret
     * value, which should never be revealed</li><li>Public Key - public address to be
     * published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum
     * follows BIP44 specification and generates for BSC wallet with derivation path
     * m'/44'/60'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible BSC wallet.</p>
     *
     *
     * @summary Generate BSC wallet
     * @throws FetchError<400, types.BscGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.BscGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BscGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscGenerateWallet(metadata?: types.BscGenerateWalletMetadataParam): Promise<FetchResponse<200, types.BscGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/address/{xpub}/{index}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate BSC account deposit address from Extended public key. Deposit address is
     * generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate BSC account address from Extended public key
     * @throws FetchError<400, types.BscGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.BscGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BscGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscGenerateAddress(metadata: types.BscGenerateAddressMetadataParam): Promise<FetchResponse<200, types.BscGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/wallet/priv</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate private key of address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate BSC private key
     * @throws FetchError<400, types.BscGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.BscGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BscGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscGenerateAddressPrivateKey(body: types.BscGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.BscGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the BSC node
     * provided by Tatum.
     * To learn more about BSC Web3, visit the <a href="https://bsc.org/en/developers/"
     * target="_blank">BSC developer's guide.</a></p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.BscWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.BscWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BscWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscWeb3Driver(body: types.BscWeb3DriverBodyParam, metadata: types.BscWeb3DriverMetadataParam): Promise<FetchResponse<200, types.BscWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/block/current</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get BSC current block number. This is the number of the latest block in the
     * blockchain.</p>
     *
     *
     * @summary Get current block number
     * @throws FetchError<401, types.BscGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BscGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscGetCurrentBlock(): Promise<FetchResponse<200, types.BscGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/block/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get BSC block by block hash or block number.</p>
     *
     *
     * @summary Get BSC block by hash
     * @throws FetchError<400, types.BscGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.BscGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BscGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscGetBlock(metadata: types.BscGetBlockMetadataParam): Promise<FetchResponse<200, types.BscGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get BSC account balance in BNB. This method does not prints any balance of the BEP20
     * or BEP721 tokens on the account.</p>
     *
     *
     * @summary Get BSC Account balance
     * @throws FetchError<400, types.BscGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.BscGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BscGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscGetBalance(metadata: types.BscGetBalanceMetadataParam): Promise<FetchResponse<200, types.BscGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/transaction/{hash}</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Get BSC transaction by transaction hash.</p>
     *
     *
     * @summary Get BSC Transaction
     * @throws FetchError<400, types.BscGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.BscGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BscGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BscGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscGetTransaction(metadata: types.BscGetTransactionMetadataParam): Promise<FetchResponse<200, types.BscGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/transaction/count/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get a number of outgoing BSC transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing BSC transactions
     * @throws FetchError<400, types.BscGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.BscGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.BscGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscGetTransactionCount(metadata: types.BscGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.BscGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send BNB or Tatum supported BEP20 token from account to account.<br/><br/>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending BNB, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Send BSC / BEP20 from account to account
     * @throws FetchError<400, types.BscBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.BscBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BscBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BscBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscBlockchainTransfer(body: types.BscBlockchainTransferBodyParam): Promise<FetchResponse<200, types.BscBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on BNB Smart Chain.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>If <b>caller</b> field is present instead of the private key, Tatum will sign the
     * transaction with the managed private key connected to the caller address. This is
     * applicable only for paid mainnet plans and all testnet plans. Keep in mind that the
     * caller address must have enough access right to perform the action in the smart contract
     * method.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Invoke a method in a smart contract on BNB Smart Chain
     * @throws FetchError<400, types.BscBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.BscBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BscBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BscBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscBlockchainSmartContractInvocation(body: types.BscBlockchainSmartContractInvocationBodyParam): Promise<FetchResponse<200, types.BscBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/bsc/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to BSC blockchain. This method is used internally from
     * Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed BSC transaction
     * @throws FetchError<400, types.BscBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.BscBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.BscBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.BscBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    bscBroadcast(body: types.BscBroadcastBodyParam): Promise<FetchResponse<200, types.BscBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/wallet</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can
     * generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special
     * words in defined order and can restore access to all generated addresses and private
     * keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret
     * value, which should never be revealed</li><li>Public Key - public address to be
     * published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum
     * follows BIP44 specification and generates for Kcs wallet with derivation path
     * m'/44'/966'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Kcs wallet.</p>
     *
     *
     * @summary Generate Kcs wallet
     * @throws FetchError<400, types.KcsGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.KcsGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KcsGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsGenerateWallet(metadata?: types.KcsGenerateWalletMetadataParam): Promise<FetchResponse<200, types.KcsGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/address/{xpub}/{index}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate Kcs account deposit address from Extended public key. Deposit address is
     * generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate Kcs account address from Extended public key
     * @throws FetchError<400, types.KcsGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.KcsGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KcsGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsGenerateAddress(metadata: types.KcsGenerateAddressMetadataParam): Promise<FetchResponse<200, types.KcsGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/wallet/priv</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate private key of address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate Kcs private key
     * @throws FetchError<400, types.KcsGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.KcsGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KcsGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsGenerateAddressPrivateKey(body: types.KcsGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.KcsGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the Kcs node
     * provided by Tatum.
     * To learn more about Kcs Web3, visit the <a href="https://docs.kcc.io/"
     * target="_blank">Kcs developer's guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.KcsWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.KcsWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KcsWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsWeb3Driver(body: types.KcsWeb3DriverBodyParam, metadata: types.KcsWeb3DriverMetadataParam): Promise<FetchResponse<200, types.KcsWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/block/current</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Kcs current block number. This is the number of the latest block in the
     * blockchain.</p>
     *
     *
     * @summary Get current block number
     * @throws FetchError<401, types.KcsGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KcsGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsGetCurrentBlock(): Promise<FetchResponse<200, types.KcsGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/block/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Kcs block by block hash or block number.</p>
     *
     *
     * @summary Get Kcs block by hash
     * @throws FetchError<400, types.KcsGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.KcsGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KcsGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsGetBlock(metadata: types.KcsGetBlockMetadataParam): Promise<FetchResponse<200, types.KcsGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Kcs account balance in KCS. This method does not prints any balance of the ERC20
     * or ERC721 tokens on the account.</p>
     *
     *
     * @summary Get Kcs Account balance
     * @throws FetchError<400, types.KcsGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.KcsGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KcsGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsGetBalance(metadata: types.KcsGetBalanceMetadataParam): Promise<FetchResponse<200, types.KcsGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/transaction/{hash}</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Get Kcs transaction by transaction hash.</p>
     *
     *
     * @summary Get Kcs Transaction
     * @throws FetchError<400, types.KcsGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.KcsGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.KcsGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.KcsGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsGetTransaction(metadata: types.KcsGetTransactionMetadataParam): Promise<FetchResponse<200, types.KcsGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/transaction/count/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get a number of outgoing Kcs transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing Kcs transactions
     * @throws FetchError<400, types.KcsGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.KcsGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.KcsGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsGetTransactionCount(metadata: types.KcsGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.KcsGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send KCS from account to account.<br/><br/>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending KCS, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     * Alternatively, using the Tatum client library for supported languages.</p>
     *
     *
     * @summary Send KCS from account to account
     * @throws FetchError<400, types.KcsBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.KcsBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.KcsBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.KcsBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsBlockchainTransfer(body: types.KcsBlockchainTransferBodyParam): Promise<FetchResponse<200, types.KcsBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on KuCoin Community Chain.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Invoke a method in a smart contract on KuCoin Community Chain
     * @throws FetchError<400, types.KcsBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.KcsBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.KcsBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.KcsBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsBlockchainSmartContractInvocation(body: types.KcsBlockchainSmartContractInvocationBodyParam): Promise<FetchResponse<200, types.KcsBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/kcs/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Kcs blockchain. This method is used internally from
     * Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed Kcs transaction
     * @throws FetchError<400, types.KcsBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.KcsBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.KcsBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.KcsBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    kcsBroadcast(body: types.KcsBroadcastBodyParam): Promise<FetchResponse<200, types.KcsBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/one/wallet</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can
     * generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special
     * words in defined order and can restore access to all generated addresses and private
     * keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret
     * value, which should never be revealed</li><li>Public Key - public address to be
     * published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum
     * follows BIP44 specification and generates for ONE wallet with derivation path
     * m'/44'/60'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible ONE wallet.</p>
     *
     *
     * @summary Generate ONE wallet
     * @throws FetchError<400, types.OneGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.OneGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OneGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneGenerateWallet(metadata?: types.OneGenerateWalletMetadataParam): Promise<FetchResponse<200, types.OneGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/one/address/{xpub}/{index}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate ONE account deposit address from Extended public key. Deposit address is
     * generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate ONE account address from Extended public key
     * @throws FetchError<400, types.OneGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.OneGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OneGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneGenerateAddress(metadata: types.OneGenerateAddressMetadataParam): Promise<FetchResponse<200, types.OneGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/one/address/format/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Transform HEX address to Bech32 format with one prefix.</p>
     *
     *
     * @summary Transform HEX address to Bech32 ONE address format
     * @throws FetchError<400, types.OneFormatAddressResponse400> Bad Request
     * @throws FetchError<401, types.OneFormatAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OneFormatAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneFormatAddress(metadata: types.OneFormatAddressMetadataParam): Promise<FetchResponse<200, types.OneFormatAddressResponse200>>;
    /**
     * <p style="display: none">/v3/one/wallet/priv</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate private key of address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate ONE private key
     * @throws FetchError<400, types.OneGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.OneGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OneGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneGenerateAddressPrivateKey(body: types.OneGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.OneGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/one/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the ONE node
     * provided by Tatum.
     * To learn more about ONE Web3, visit the <a
     * href="https://docs.harmony.one/home/developers/api" target="_blank">ONE developer's
     * guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.OneWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.OneWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OneWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneWeb3Driver(body: types.OneWeb3DriverBodyParam, metadata: types.OneWeb3DriverMetadataParam): Promise<FetchResponse<200, types.OneWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/one/block/current</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get ONE current block number. This is the number of the latest block in the
     * blockchain.</p>
     *
     *
     * @summary Get current block number
     * @throws FetchError<401, types.OneGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OneGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneGetCurrentBlock(): Promise<FetchResponse<200, types.OneGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/one/block/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get ONE block by block hash or block number.</p>
     *
     *
     * @summary Get ONE block by hash
     * @throws FetchError<400, types.OneGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.OneGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OneGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneGetBlock(metadata: types.OneGetBlockMetadataParam): Promise<FetchResponse<200, types.OneGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/one/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get ONE account balance in ONE. This method does not prints any balance of the HRM20
     * or HRM721 tokens on the account.</p>
     *
     *
     * @summary Get ONE Account balance
     * @throws FetchError<400, types.OneGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.OneGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OneGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneGetBalance(metadata: types.OneGetBalanceMetadataParam): Promise<FetchResponse<200, types.OneGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/one/transaction/{hash}</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Get ONE transaction by transaction hash.</p>
     *
     *
     * @summary Get ONE Transaction
     * @throws FetchError<400, types.OneGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.OneGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.OneGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.OneGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneGetTransaction(metadata: types.OneGetTransactionMetadataParam): Promise<FetchResponse<200, types.OneGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/one/transaction/count/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get a number of outgoing ONE transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing ONE transactions
     * @throws FetchError<400, types.OneGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.OneGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.OneGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneGetTransactionCount(metadata: types.OneGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.OneGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/one/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send ONE from account to account.</p>
     * <p>The default shard <code>0</code> is used for the sender and the recipient.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending ONE, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     * Alternatively, using the Tatum client library for supported languages.</p>
     *
     *
     * @summary Send ONE from account to account
     * @throws FetchError<400, types.OneBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.OneBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.OneBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.OneBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneBlockchainTransfer(body: types.OneBlockchainTransferBodyParam, metadata?: types.OneBlockchainTransferMetadataParam): Promise<FetchResponse<200, types.OneBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/one/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Harmony.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Invoke a method in a smart contract on Harmony
     * @throws FetchError<400, types.OneBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.OneBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.OneBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.OneBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneBlockchainSmartContractInvocation(body: types.OneBlockchainSmartContractInvocationBodyParam, metadata?: types.OneBlockchainSmartContractInvocationMetadataParam): Promise<FetchResponse<200, types.OneBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/one/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to ONE blockchain. This method is used internally from
     * Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed ONE transaction
     * @throws FetchError<400, types.OneBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.OneBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.OneBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.OneBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    oneBroadcast(body: types.OneBroadcastBodyParam, metadata?: types.OneBroadcastMetadataParam): Promise<FetchResponse<200, types.OneBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/vet/wallet</p>
     * <h4>5 credits per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very
     * convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase.
     * Mnemonic phrase consists of 24 special words in defined order and can restore access to
     * all generated addresses and private keys.<br/>Each address is identified by 3 main
     * values:<ul><li>Private Key - your secret value, which should never be
     * revealed</li><li>Public Key - public address to be published</li><li>Derivation index -
     * index of generated address</li></ul></p><p>Tatum follows BIP44 specification and
     * generates for VeChain wallet with derivation path m'/44'/818'/0'/0. More about BIP44 HD
     * wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible VeChain wallet.</p>
     *
     *
     * @summary Generate VeChain wallet
     * @throws FetchError<400, types.VetGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.VetGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.VetGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    vetGenerateWallet(metadata?: types.VetGenerateWalletMetadataParam): Promise<FetchResponse<200, types.VetGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/vet/address/{xpub}/{index}</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate VeChain account deposit address from Extended public key. Deposit address is
     * generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate VeChain account address from Extended public key
     * @throws FetchError<400, types.VetGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.VetGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.VetGenerateAddressResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.VetGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    vetGenerateAddress(metadata: types.VetGenerateAddressMetadataParam): Promise<FetchResponse<200, types.VetGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/vet/wallet/priv</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate private key of address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     *
     * @summary Generate VeChain private key
     * @throws FetchError<400, types.VetGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.VetGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.VetGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    vetGenerateAddressPrivateKey(body: types.VetGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.VetGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/vet/block/current</p>
     * <h4>5 credits per API call.</h4><br/><p>Get VeChain current block number.</p>
     *
     * @summary Get VeChain current block
     * @throws FetchError<401, types.VetGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.VetGetCurrentBlockResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.VetGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    vetGetCurrentBlock(): Promise<FetchResponse<200, types.VetGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/vet/block/{hash}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get VeChain Block by block hash or block
     * number.</p>
     *
     * @summary Get VeChain Block by hash
     * @throws FetchError<400, types.VetGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.VetGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.VetGetBlockResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.VetGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    vetGetBlock(metadata: types.VetGetBlockMetadataParam): Promise<FetchResponse<200, types.VetGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/vet/account/balance/{address}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get VeChain Account balance in VET.</p>
     *
     * @summary Get VeChain Account balance
     * @throws FetchError<400, types.VetGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.VetGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.VetGetBalanceResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.VetGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    vetGetBalance(metadata: types.VetGetBalanceMetadataParam): Promise<FetchResponse<200, types.VetGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/vet/account/energy/{address}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get VeChain Account energy in VTHO. VTHO is used
     * for paying for the transaction fee.</p>
     *
     * @summary Get VeChain Account energy (VTHO)
     * @throws FetchError<400, types.VetGetEnergyResponse400> Bad Request
     * @throws FetchError<401, types.VetGetEnergyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.VetGetEnergyResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.VetGetEnergyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    vetGetEnergy(metadata: types.VetGetEnergyMetadataParam): Promise<FetchResponse<200, types.VetGetEnergyResponse200>>;
    /**
     * <p style="display: none">/v3/vet/transaction/{hash}</p>
     * <h4>10 credits per API call.</h4><br/><p>Get VeChain Transaction by transaction
     * hash.</p>
     *
     * @summary Get VeChain Transaction
     * @throws FetchError<400, types.VetGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.VetGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.VetGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.VetGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    vetGetTransaction(metadata: types.VetGetTransactionMetadataParam): Promise<FetchResponse<200, types.VetGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/vet/transaction/{hash}/receipt</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Get VeChain Transaction Receipt by transaction hash. Transaction receipt is available
     * only after transaction is
     * included in the block and contains information about paid fee or created contract
     * address and much more.</p>
     *
     *
     * @summary Get VeChain Transaction Receipt
     * @throws FetchError<400, types.VetGetTransactionReceiptResponse400> Bad Request
     * @throws FetchError<401, types.VetGetTransactionReceiptResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.VetGetTransactionReceiptResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.VetGetTransactionReceiptResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    vetGetTransactionReceipt(metadata: types.VetGetTransactionReceiptMetadataParam): Promise<FetchResponse<200, types.VetGetTransactionReceiptResponse200>>;
    /**
     * <p style="display: none">/v3/vet/transaction</p>
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send VET from account to account. Fee for the transaction is paid in VTHO.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and loss of funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Send VeChain from account to account
     * @throws FetchError<400, types.VetBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.VetBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.VetBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.VetBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    vetBlockchainTransfer(body: types.VetBlockchainTransferBodyParam): Promise<FetchResponse<200, types.VetBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/vet/broadcast</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to VeChain blockchain. This method is used internally
     * from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed VeChain transaction
     * @throws FetchError<400, types.VetBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.VetBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.VetBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.VetBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    vetBroadcast(body: types.VetBroadcastBodyParam): Promise<FetchResponse<200, types.VetBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/wallet</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can
     * generate 2^31 addresses from 1 mnemonic phrase.
     * Mnemonic phrase consists of 24 special words in defined order and can restore access to
     * all generated addresses and private keys.
     * <br/>
     * Each address is identified by 3 main values:
     * <ul><li>Private Key - your secret value, which should never be revealed</li>
     * <li>Public Key - public address to be published</li>
     * <li>Derivation index - index of generated address</li></ul>
     * </p>
     * <p>Tatum follows BIP44 specification and generates for XDC wallet with derivation path
     * m'/44'/550'/0'/0.
     * More about BIP44 HD wallets can be found here - <a target="_blank"
     * href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible XDC wallet.</p>
     *
     *
     * @summary Generate XDC wallet
     * @throws FetchError<400, types.XdcGenerateWalletResponse400> Bad Request
     * @throws FetchError<401, types.XdcGenerateWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.XdcGenerateWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcGenerateWallet(metadata?: types.XdcGenerateWalletMetadataParam): Promise<FetchResponse<200, types.XdcGenerateWalletResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/address/{xpub}/{index}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate XDC account deposit address from Extended public key. Deposit address is
     * generated for the specific
     * index - each extended public key can generate up to 2^31 addresses starting from index 0
     * until 2^31.</p>
     *
     *
     * @summary Generate XDC account address from Extended public key
     * @throws FetchError<400, types.XdcGenerateAddressResponse400> Bad Request
     * @throws FetchError<401, types.XdcGenerateAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.XdcGenerateAddressResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcGenerateAddress(metadata: types.XdcGenerateAddressMetadataParam): Promise<FetchResponse<200, types.XdcGenerateAddressResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/wallet/priv</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Generate private key of address from mnemonic for given derivation path index.
     * Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     *
     * @summary Generate XDC private key
     * @throws FetchError<400, types.XdcGenerateAddressPrivateKeyResponse400> Bad Request
     * @throws FetchError<401, types.XdcGenerateAddressPrivateKeyResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.XdcGenerateAddressPrivateKeyResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcGenerateAddressPrivateKey(body: types.XdcGenerateAddressPrivateKeyBodyParam): Promise<FetchResponse<200, types.XdcGenerateAddressPrivateKeyResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/web3/{xApiKey}</p>
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a
     * href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC
     * driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the XDC node
     * provided by Tatum.
     * To learn more about XDC Web3, visit the <a href="https://howto.xinfin.org/"
     * target="_blank">XDC developer's guide</a>.</p>
     *
     *
     * @summary Web3 HTTP driver
     * @throws FetchError<400, types.XdcWeb3DriverResponse400> Bad Request
     * @throws FetchError<401, types.XdcWeb3DriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.XdcWeb3DriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcWeb3Driver(body: types.XdcWeb3DriverBodyParam, metadata: types.XdcWeb3DriverMetadataParam): Promise<FetchResponse<200, types.XdcWeb3DriverResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/block/current</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get XDC current block number. This is the number of the latest block in the
     * blockchain.</p>
     *
     *
     * @summary Get current block number
     * @throws FetchError<401, types.XdcGetCurrentBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.XdcGetCurrentBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcGetCurrentBlock(): Promise<FetchResponse<200, types.XdcGetCurrentBlockResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/block/{hash}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get XDC block by block hash or block number.</p>
     *
     *
     * @summary Get XDC block by hash
     * @throws FetchError<400, types.XdcGetBlockResponse400> Bad Request
     * @throws FetchError<401, types.XdcGetBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.XdcGetBlockResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcGetBlock(metadata: types.XdcGetBlockMetadataParam): Promise<FetchResponse<200, types.XdcGetBlockResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/account/balance/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get account balance in XDC. This method does not prints any balance of the ERC20 or
     * ERC721 tokens on the account.</p>
     *
     *
     * @summary Get XDC Account balance
     * @throws FetchError<400, types.XdcGetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.XdcGetBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.XdcGetBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcGetBalance(metadata: types.XdcGetBalanceMetadataParam): Promise<FetchResponse<200, types.XdcGetBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/transaction/{hash}</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Get XDC transaction by transaction hash.</p>
     *
     *
     * @summary Get XDC Transaction
     * @throws FetchError<400, types.XdcGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.XdcGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XdcGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XdcGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcGetTransaction(metadata: types.XdcGetTransactionMetadataParam): Promise<FetchResponse<200, types.XdcGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/transaction/count/{address}</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get a number of outgoing XDC transactions for the address. When a transaction is
     * sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a
     * counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     *
     * @summary Get count of outgoing XDC transactions
     * @throws FetchError<400, types.XdcGetTransactionCountResponse400> Bad Request
     * @throws FetchError<401, types.XdcGetTransactionCountResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<500, types.XdcGetTransactionCountResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcGetTransactionCount(metadata: types.XdcGetTransactionCountMetadataParam): Promise<FetchResponse<200, types.XdcGetTransactionCountResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/transaction</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Send XDC or Tatum supported ERC20 token from account to account.<br/><br/>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending XDC, you are charged a fee for the transaction, and you must sign the
     * transaction with the private key of the blockchain address from which the fee will be
     * deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     * Alternatively, using the Tatum client library for supported languages.</p>
     *
     *
     * @summary Send XDC / ERC20 from account to account
     * @throws FetchError<400, types.XdcBlockchainTransferResponse400> Bad Request
     * @throws FetchError<401, types.XdcBlockchainTransferResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XdcBlockchainTransferResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XdcBlockchainTransferResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcBlockchainTransfer(body: types.XdcBlockchainTransferBodyParam): Promise<FetchResponse<200, types.XdcBlockchainTransferResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/smartcontract</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on XinFin.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds
     * the specified smart contract, and executes the specified ABI method with the provided
     * parameters).<br/>However, because this API can be run against any smart contract on the
     * blockchain, Tatum cannot in any way guarantee that the method itself will be executed
     * successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this
     * method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a
     * href="https://support.tatum.io/support/solutions/articles/80001052441"
     * target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction,
     * and you must sign the transaction with the private key of the blockchain address from
     * which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions,
     * because the private key can be stolen or exposed. Your private keys should never leave
     * your security perimeter. You should use the private keys only for testing a solution you
     * are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use
     * the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management
     * System (KMS)</a> and provide the signature ID instead of the private key in the API.
     * Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2"
     * target="_blank">Tatum JavaScript client</a>.</p>
     *
     *
     * @summary Invoke a method in a smart contract on XinFin
     * @throws FetchError<400, types.XdcBlockchainSmartContractInvocationResponse400> Bad Request
     * @throws FetchError<401, types.XdcBlockchainSmartContractInvocationResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XdcBlockchainSmartContractInvocationResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XdcBlockchainSmartContractInvocationResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcBlockchainSmartContractInvocation(body: types.XdcBlockchainSmartContractInvocationBodyParam): Promise<FetchResponse<200, types.XdcBlockchainSmartContractInvocationResponse200>>;
    /**
     * <p style="display: none">/v3/xdc/broadcast</p>
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to XDC blockchain. This method is used internally from
     * Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed XDC transaction
     * @throws FetchError<400, types.XdcBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.XdcBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XdcBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XdcBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xdcBroadcast(body: types.XdcBroadcastBodyParam): Promise<FetchResponse<200, types.XdcBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/xlm/account</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate XLM account. Tatum does not support HD wallet for XLM, only specific address
     * and private key can be generated.</p>
     *
     *
     * @summary Generate XLM account
     * @throws FetchError<401, types.XlmWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XlmWalletResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XlmWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xlmWallet(): Promise<FetchResponse<200, types.XlmWalletResponse200>>;
    /**
     * <p style="display: none">/v3/xlm/info</p>
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Blockchain last closed ledger.</p>
     *
     * @summary Get XLM Blockchain Information
     * @throws FetchError<401, types.XlmGetLastClosedLedgerResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XlmGetLastClosedLedgerResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XlmGetLastClosedLedgerResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xlmGetLastClosedLedger(): Promise<FetchResponse<200, types.XlmGetLastClosedLedgerResponse200>>;
    /**
     * <p style="display: none">/v3/xlm/ledger/{sequence}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Blockchain ledger for ledger
     * sequence.</p>
     *
     * @summary Get XLM Blockchain Ledger by sequence
     * @throws FetchError<400, types.XlmGetLedgerResponse400> Bad Request
     * @throws FetchError<401, types.XlmGetLedgerResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XlmGetLedgerResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XlmGetLedgerResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xlmGetLedger(metadata: types.XlmGetLedgerMetadataParam): Promise<FetchResponse<200, types.XlmGetLedgerResponse200>>;
    /**
     * <p style="display: none">/v3/xlm/ledger/{sequence}/transaction</p>
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Blockchain transactions in the
     * ledger.</p>
     *
     * @summary Get XLM Blockchain Transactions in Ledger
     * @throws FetchError<400, types.XlmGetLedgerTxResponse400> Bad Request
     * @throws FetchError<401, types.XlmGetLedgerTxResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XlmGetLedgerTxResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XlmGetLedgerTxResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xlmGetLedgerTx(metadata: types.XlmGetLedgerTxMetadataParam): Promise<FetchResponse<200, types.XlmGetLedgerTxResponse200>>;
    /**
     * <p style="display: none">/v3/xlm/fee</p>
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Blockchain fee in 1/10000000 of XLM
     * (stroop)</p>
     *
     * @summary Get actual XLM fee
     * @throws FetchError<401, types.XlmGetFeeResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XlmGetFeeResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XlmGetFeeResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xlmGetFee(): Promise<FetchResponse<200, types.XlmGetFeeResponse200>>;
    /**
     * <p style="display: none">/v3/xlm/account/tx/{account}</p>
     * <h4>5 credits per API call.</h4><br/><p>List all XLM account transactions.</p>
     *
     * @summary Get XLM Account transactions
     * @throws FetchError<400, types.XlmGetAccountTxResponse400> Bad Request
     * @throws FetchError<401, types.XlmGetAccountTxResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XlmGetAccountTxResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XlmGetAccountTxResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xlmGetAccountTx(metadata: types.XlmGetAccountTxMetadataParam): Promise<FetchResponse<200, types.XlmGetAccountTxResponse200>>;
    /**
     * <p style="display: none">/v3/xlm/transaction/{hash}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Transaction by transaction hash.</p>
     *
     * @summary Get XLM Transaction by hash
     * @throws FetchError<400, types.XlmGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.XlmGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XlmGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XlmGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xlmGetTransaction(metadata: types.XlmGetTransactionMetadataParam): Promise<FetchResponse<200, types.XlmGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/xlm/account/{account}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Account detail.</p>
     *
     * @summary Get XLM Account info
     * @throws FetchError<400, types.XlmGetAccountInfoResponse400> Bad Request
     * @throws FetchError<401, types.XlmGetAccountInfoResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XlmGetAccountInfoResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XlmGetAccountInfoResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xlmGetAccountInfo(metadata: types.XlmGetAccountInfoMetadataParam): Promise<FetchResponse<200, types.XlmGetAccountInfoResponse200>>;
    /**
     * <p style="display: none">/v3/xlm/transaction</p>
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send XLM from account to account. It is possbile to send native XLM asset, or any
     * other custom asset present on the network.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and loss of funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Send XLM from address to address
     * @throws FetchError<400, types.XlmTransferBlockchainResponse400> Bad Request
     * @throws FetchError<401, types.XlmTransferBlockchainResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XlmTransferBlockchainResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XlmTransferBlockchainResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xlmTransferBlockchain(body: types.XlmTransferBlockchainBodyParam): Promise<FetchResponse<200, types.XlmTransferBlockchainResponse200>>;
    /**
     * <p style="display: none">/v3/xlm/trust</p>
     * <h4>10 credits per API call.</h4><br/><p>
     * <p>Create / Update / Delete XLM trust line between accounts to transfer private assets.
     * By creating trustline for the first time, the asset is created automatically and can be
     * used in the transactions.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and loss of funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Create / Update / Delete XLM trust line
     * @throws FetchError<400, types.XlmTrustLineBlockchainResponse400> Bad Request
     * @throws FetchError<401, types.XlmTrustLineBlockchainResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XlmTrustLineBlockchainResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XlmTrustLineBlockchainResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xlmTrustLineBlockchain(body: types.XlmTrustLineBlockchainBodyParam): Promise<FetchResponse<200, types.XlmTrustLineBlockchainResponse200>>;
    /**
     * <p style="display: none">/v3/xlm/broadcast</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to XLM blockchain. This method is used internally from
     * Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed XLM transaction
     * @throws FetchError<400, types.XlmBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.XlmBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XlmBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XlmBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xlmBroadcast(body: types.XlmBroadcastBodyParam): Promise<FetchResponse<200, types.XlmBroadcastResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/account</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate XRP account. Tatum does not support HD wallet for XRP, only specific address
     * and private key can be generated.</p>
     *
     *
     * @summary Generate XRP account
     * @throws FetchError<401, types.XrpWalletResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpWalletResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpWalletResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpWallet(): Promise<FetchResponse<200, types.XrpWalletResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/info</p>
     * <h4>5 credits per API call.</h4><br/><p>Get XRP Blockchain last closed ledger index and
     * hash.</p>
     *
     * @summary Get XRP Blockchain Information
     * @throws FetchError<401, types.XrpGetLastClosedLedgerResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpGetLastClosedLedgerResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpGetLastClosedLedgerResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpGetLastClosedLedger(): Promise<FetchResponse<200, types.XrpGetLastClosedLedgerResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/fee</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Get XRP Blockchain fee. Standard fee for the transaction is available in the
     * drops.base_fee section and is 10 XRP drops by default.
     * When there is a heavy traffic on the blockchain, fees are increasing according to
     * current traffic.</p>
     *
     *
     * @summary Get actual Blockchain fee
     * @throws FetchError<401, types.XrpGetFeeResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpGetFeeResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpGetFeeResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpGetFee(): Promise<FetchResponse<200, types.XrpGetFeeResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/account/tx/{account}</p>
     * <h4>5 credits per API call.</h4><br/><p>List all Account transactions.</p>
     *
     * @summary Get Account transactions
     * @throws FetchError<400, types.XrpGetAccountTxResponse400> Bad Request
     * @throws FetchError<401, types.XrpGetAccountTxResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpGetAccountTxResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpGetAccountTxResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpGetAccountTx(metadata: types.XrpGetAccountTxMetadataParam): Promise<FetchResponse<200, types.XrpGetAccountTxResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/ledger/{i}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get ledger by sequence.</p>
     *
     * @summary Get Ledger
     * @throws FetchError<400, types.XrpGetLedgerResponse400> Bad Request
     * @throws FetchError<401, types.XrpGetLedgerResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpGetLedgerResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpGetLedgerResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpGetLedger(metadata: types.XrpGetLedgerMetadataParam): Promise<FetchResponse<200, types.XrpGetLedgerResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/transaction/{hash}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get XRP Transaction by transaction hash.</p>
     *
     * @summary Get XRP Transaction by hash
     * @throws FetchError<400, types.XrpGetTransactionResponse400> Bad Request
     * @throws FetchError<401, types.XrpGetTransactionResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpGetTransactionResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpGetTransactionResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpGetTransaction(metadata: types.XrpGetTransactionMetadataParam): Promise<FetchResponse<200, types.XrpGetTransactionResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/account/{account}</p>
     * <h4>5 credits per API call.</h4><br/><p>Get XRP Account info.</p>
     *
     * @summary Get Account info
     * @throws FetchError<400, types.XrpGetAccountInfoResponse400> Bad Request
     * @throws FetchError<401, types.XrpGetAccountInfoResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpGetAccountInfoResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpGetAccountInfoResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpGetAccountInfo(metadata: types.XrpGetAccountInfoMetadataParam): Promise<FetchResponse<200, types.XrpGetAccountInfoResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/account/{account}/balance</p>
     * <h4>5 credits per API call.</h4><br/><p>Get XRP Account Balance. Obtain balance of the
     * XRP and other assets on the account.</p>
     *
     * @summary Get Account Balance
     * @throws FetchError<400, types.XrpGetAccountBalanceResponse400> Bad Request
     * @throws FetchError<401, types.XrpGetAccountBalanceResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpGetAccountBalanceResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpGetAccountBalanceResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpGetAccountBalance(metadata: types.XrpGetAccountBalanceMetadataParam): Promise<FetchResponse<200, types.XrpGetAccountBalanceResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/transaction</p>
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send XRP from account to account.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and loss of funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Send XRP from address to address
     * @throws FetchError<400, types.XrpTransferBlockchainResponse400> Bad Request
     * @throws FetchError<401, types.XrpTransferBlockchainResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpTransferBlockchainResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpTransferBlockchainResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpTransferBlockchain(body: types.XrpTransferBlockchainBodyParam): Promise<FetchResponse<200, types.XrpTransferBlockchainResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/trust</p>
     * <h4>10 credits per API call.</h4><br/><p>
     * <p>Create / Update / Delete XRP trust line between accounts to transfer private assets.
     * By creating trustline for the first time, the asset is created automatically and can be
     * used in the transactions.<br/>
     * Account setting rippling must be enabled on the issuer account before the trust line
     * creation to asset work correctly.
     * Creating a trust line will cause an additional 5 XRP to be blocked on the
     * account.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and loss of funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.</p>
     *
     *
     * @summary Create / Update / Delete XRP trust line
     * @throws FetchError<400, types.XrpTrustLineBlockchainResponse400> Bad Request
     * @throws FetchError<401, types.XrpTrustLineBlockchainResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpTrustLineBlockchainResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpTrustLineBlockchainResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpTrustLineBlockchain(body: types.XrpTrustLineBlockchainBodyParam): Promise<FetchResponse<200, types.XrpTrustLineBlockchainResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/account/settings</p>
     * <h4>10 credits per API call.</h4><br/><p>
     * <p>Modify XRP account settings. If an XRP account should be an issuer of the custom
     * asset, this accounts should have rippling enabled to true.
     * In order to support off-chain processing, required destination tag should be set on the
     * account.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are
     * transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong
     * possibility of stealing keys and loss of funds. In this method, it is possible to enter
     * privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions
     * of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be
     * used for the highest security standards, and signatureId should be present in the
     * request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     *
     * @summary Modify XRP account
     * @throws FetchError<400, types.XrpAccountSettingsResponse400> Bad Request
     * @throws FetchError<401, types.XrpAccountSettingsResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpAccountSettingsResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpAccountSettingsResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpAccountSettings(body: types.XrpAccountSettingsBodyParam): Promise<FetchResponse<200, types.XrpAccountSettingsResponse200>>;
    /**
     * <p style="display: none">/v3/xrp/broadcast</p>
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to XRP blockchain. This method is used internally from
     * Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for
     * broadcasting data to the blockchain.</p>
     *
     *
     * @summary Broadcast signed XRP transaction
     * @throws FetchError<400, types.XrpBroadcastResponse400> Bad Request
     * @throws FetchError<401, types.XrpBroadcastResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.XrpBroadcastResponse403> Forbidden. The request is authenticated, but it is not possible to required perform
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.XrpBroadcastResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    xrpBroadcast(body: types.XrpBroadcastBodyParam): Promise<FetchResponse<200, types.XrpBroadcastResponse200>>;
    /**
     * <p><b>The number of credits consumed depends on the number of methods submitted in an
     * API call:<br/>
     * * 50 credits per debug*\/trace* method (for EVM-based blockchains)<br/>
     * * 50 credits per EOS <a
     * href="https://developers.eos.io/manuals/eos/v2.0/nodeos/plugins/trace_api_plugin/api-reference/index"
     * target="_blank">Trace API</a> methods <br/>
     * * 5 credits per eth_call method (for EVM-based blockchains)<br/>
     * * 2 credits per any other RPC method</b></p>
     * <p>Connect directly to the blockchain node provided by Tatum.</p>
     * <p>The <code>POST</code> method is used. The API endpoint URL acts as an HTTP-based RPC
     * driver.</p>
     *
     *
     * @summary Connect to the blockchain node through an RPC driver
     * @throws FetchError<400, types.NodeJsonPostRpcDriverResponse400> Bad Request
     * @throws FetchError<401, types.NodeJsonPostRpcDriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.NodeJsonPostRpcDriverResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.NodeJsonPostRpcDriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    nodeJsonPostRpcDriver(body: types.NodeJsonPostRpcDriverBodyParam, metadata: types.NodeJsonPostRpcDriverMetadataParam): Promise<FetchResponse<200, types.NodeJsonPostRpcDriverResponse200>>;
    /**
     * <p><b>2 credits per RPC method in an API call</b></p>
     * <p>Connect directly to the blockchain node provided by Tatum.</p>
     * <p>The <code>PUT</code> method is used. The API endpoint URL acts as an HTTP-based RPC
     * driver.</p>
     *
     *
     * @summary Connect to the blockchain node through an RPC driver
     * @throws FetchError<400, types.NodeJsonRpcPutDriverResponse400> Bad Request
     * @throws FetchError<401, types.NodeJsonRpcPutDriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.NodeJsonRpcPutDriverResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.NodeJsonRpcPutDriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    nodeJsonRpcPutDriver(body: types.NodeJsonRpcPutDriverBodyParam, metadata: types.NodeJsonRpcPutDriverMetadataParam): Promise<FetchResponse<200, types.NodeJsonRpcPutDriverResponse200>>;
    /**
     * <p><b>2 credits per RPC method in an API call</b></p>
     * <p>Connect directly to the blockchain node provided by Tatum.</p>
     * <p>The <code>GET</code> method is used. The API endpoint URL acts as an HTTP-based RPC
     * driver.</p>
     *
     *
     * @summary Connect to the blockchain node through an RPC driver
     * @throws FetchError<400, types.NodeJsonRpcGetDriverResponse400> Bad Request
     * @throws FetchError<401, types.NodeJsonRpcGetDriverResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.NodeJsonRpcGetDriverResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.NodeJsonRpcGetDriverResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    nodeJsonRpcGetDriver(metadata: types.NodeJsonRpcGetDriverMetadataParam): Promise<FetchResponse<200, types.NodeJsonRpcGetDriverResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
