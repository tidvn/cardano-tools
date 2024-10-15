'use client';

import ConvertForm from '@/components/app/keypair/convert-form';
import GenerateForm from '@/components/app/keypair/generate-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function Page() {
    const [blockfrostkey, setBlockfrostkey] = useState('');

    return (
        <>
            <div className="mb-2 grid flex-1 gap-2">
                <Label htmlFor="link">Blockfrost Api Key</Label>
                <Input
                    id="entropyHex"
                    value={blockfrostkey}
                    onChange={(e) => setBlockfrostkey(e.target.value)}
                    className="h-15"
                />
            </div>
            <Tabs defaultValue="generate">
                <TabsList>
                    <TabsTrigger value="generate">generate</TabsTrigger>
                    <TabsTrigger value="convert">convert</TabsTrigger>
                </TabsList>
                <TabsContent value="generate">
                    <GenerateForm blockfrostkey={blockfrostkey} />
                </TabsContent>
                <TabsContent value="convert">
                    <ConvertForm blockfrostkey={blockfrostkey} />
                </TabsContent>
            </Tabs>
        </>
    );
}
