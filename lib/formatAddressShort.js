import { encodeAddress } from "@polkadot/util-crypto";

export const formatAddressShort = (
  address,
  type = "substrate",
  keep = 4
) => {
  if (!address) return "";

  // Détection automatique du type d'adresse
  const isEvm = address.startsWith("0x") && address.length === 42;
  const shouldUseEvm = isEvm || type === "evm";

  // Pour les adresses EVM
  if (shouldUseEvm) {
    return `${address.substring(0, keep + 2)}…${address.substring(address.length - keep)}`;
  }

  // Pour les adresses Substrate
  try {
    const prefix = typeof type === "number" ? type : 42;
    const formatted = encodeAddress(address, prefix);
    return `${formatted.substring(0, keep)}…${formatted.substring(formatted.length - keep)}`;
  } catch (error) {
    console.warn("Invalid address format", error);
    // Si le format n'est pas reconnu, on affiche l'adresse brute raccourcie
    return `${address.substring(0, keep)}…${address.substring(address.length - keep)}`;
  }
};