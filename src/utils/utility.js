export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const getNetworkName = (chainId) => {
  switch (chainId) {
    case 5:
      return "ethereum";
    case 80001:
      return "polygon";
    case 97:
      return "binance";
    default:
      return "none";
  }
};

export const getNetworkChainID = (network) => {
  switch (network) {
    case "ethereum":
      return "5";
    case "polygon":
      return "80001";
    case "binance":
      return "97";
    default:
      return "none";
  }
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};
