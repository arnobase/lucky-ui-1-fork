import { ApiPromise } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';

export const claimAllEras = async (api) => {
  try {
    // Récupérer l'era actuelle
    const currentEra = await api.query.dappsStaking.currentEra();
    
    // Récupérer les informations de staking pour chaque era
    const stakingInfo = await api.query.dappsStaking.generalEraInfo.entries();
    
    // Filtrer et trier les eras valides
    const validEras = stakingInfo
      .map(([key]) => key.args[0].toNumber())
      .filter(era => era < currentEra.toNumber())
      .sort((a, b) => a - b);

    if (validEras.length === 0) {
      return { success: true, message: "No eras to claim" };
    }

    // Créer la transaction pour claim toutes les eras
    const tx = api.tx.utility.batch(
      validEras.map(era => 
        api.tx.dappsStaking.claimStaker(era)
      )
    );

    // Envoyer la transaction
    const result = await new Promise((resolve, reject) => {
      tx.send(({ status, events = [], dispatchError }) => {
        if (dispatchError) {
          reject(new Error(dispatchError.toString()));
        }
        
        if (status.isInBlock || status.isFinalized) {
          resolve({
            status: status.toString(),
            blockHash: status.asInBlock?.toString()
          });
        }
      });
    });

    return {
      success: true,
      message: `Claimed rewards for ${validEras.length} eras`,
      result
    };

  } catch (error) {
    console.error('Error in claimAllEras:', error);
    throw error;
  }
}; 