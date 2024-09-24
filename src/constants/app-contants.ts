import { CardanoNetwork } from '@/types';

const appConfig = {
    title: 'aiken-meshjs',
    description: '',
};

const appNetwork: CardanoNetwork =
    (process.env.NEXT_PUBLIC_APP_NETWORK?.toLowerCase() as CardanoNetwork) || 'preprod';

export { appConfig, appNetwork };
