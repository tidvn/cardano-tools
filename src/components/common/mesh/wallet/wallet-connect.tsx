import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useWallet, useWalletList } from '@meshsdk/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/styled/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { appNetwork } from '@/constants';

export const CardanoWallet = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const { connect, wallet, connected, disconnect, name } = useWallet();

    const wallets = useWalletList();

    useEffect(() => {
        (async () => {
            if (connected && wallet) {
                const walletAddress = await wallet.getChangeAddress();
                setWalletAddress(walletAddress);
            }
        })();
    }, [connected, wallet]);

    return (
        <div style={{ width: 'min-content', zIndex: 50 }}>
            {connected ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button size="lg" className="w-full items-center gap-2">
                            <Image
                                src={wallets.find((wallet) => wallet.id === name)?.icon || ''}
                                alt={`${name} icon`}
                                height={32}
                                width={32}
                                // className="rounded-full bg-white"
                            />
                            {walletAddress?.slice(0, 12)}...{walletAddress?.slice(-4)}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={async () => {
                                await navigator.clipboard.writeText(walletAddress || '');
                            }}
                        >
                            Copy Address
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => disconnect()}>Disconnect</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                    <Button onClick={() => setDialogOpen(true)}>Connect Wallet</Button>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Connect a wallet on {appNetwork} to continue
                                </DialogTitle>
                                <div className="flex flex-col items-center gap-4 pt-6">
                                    {wallets.length > 0 ? (
                                        wallets.map((wallet, index) => (
                                            <Button
                                                key={index}
                                                className="w-full max-w-[80%] items-center gap-2"
                                                onClick={() => {
                                                    connect(wallet.id, []);
                                                    setDialogOpen(false);
                                                }}
                                            >
                                                <Image
                                                    src={wallet.icon || ''}
                                                    alt={`${wallet.name} icon`}
                                                    width={32}
                                                    height={32}
                                                />
                                                {wallet.name}
                                            </Button>
                                        ))
                                    ) : (
                                        <span>No Wallet Found</span>
                                    )}
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </div>
    );
};
