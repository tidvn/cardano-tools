'use client';

import { useState } from 'react';
import { PlusCircle, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/styled/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function JsonField({
    parentType,
    keyName,
    value,
    path,
    updateField,
    removeField,
    addField,
}: {
    parentType: string;
    keyName: string;
    value: JsonValue;
    path: string[];
    updateField: (path: string[], value: JsonValue) => void;
    removeField: (path: string[]) => void;
    addField: (path: string[]) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(true);
    const currentPath = [...path, keyName];
    const addChildField = () => {
        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                updateField(currentPath, [...value, '']);
            } else {
                const newKey = `newField${Object.keys(value).length}`;
                updateField(currentPath, { ...value, [newKey]: '' });
            }
        }
    };

    const renderValueInput = () => {
        switch (typeof value) {
            case 'string':
            case 'number':
                return (
                    <Input
                        value={String(value)}
                        type={typeof value == 'number' ? 'number' : 'text'}
                        onChange={(e) => {
                            let newValue: JsonValue = e.target.value;
                            if (typeof value === 'number') newValue = Number(e.target.value);
                            updateField(currentPath, newValue);
                        }}
                        className="w-1/3 bg-section"
                    />
                );
            case 'boolean':
                return (
                    <Select
                        value={value ? 'true' : 'false'}
                        onValueChange={(newValue) => updateField(currentPath, newValue === 'true')}
                    >
                        <SelectTrigger className="w-1/3 bg-section">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">True</SelectItem>
                            <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                    </Select>
                );
            default:
                return null;
        }
    };

    return (
        <div className="ml-8 mt-2">
            <div className="flex items-center space-x-2">
                {typeof value === 'object' && value !== null && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </Button>
                )}
                <Select
                    value={Array.isArray(value) ? 'array' : typeof value}
                    onValueChange={(newType) => {
                        let newValue: JsonValue = '';
                        if (newType === 'number') newValue = 0;
                        if (newType === 'boolean') newValue = false;
                        if (newType === 'object') newValue = {};
                        if (newType === 'array') newValue = [];
                        updateField(currentPath, newValue);
                    }}
                >
                    <SelectTrigger className="w-[120px] bg-section">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="object">Object</SelectItem>
                        <SelectItem value="array">Array</SelectItem>
                    </SelectContent>
                </Select>
                <Label className="w-1/4">
                    <Input
                        value={keyName}
                        disabled={parentType == 'array'}
                        onChange={(e) => {
                            const newPath = [...path, e.target.value];
                            removeField(currentPath);
                            updateField(newPath, value);
                        }}
                        className="w-full bg-section"
                    />
                </Label>

                {renderValueInput()}
                {typeof value === 'object' && value !== null && (
                    <Button onClick={addChildField} aria-label="Add child field">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        {`Add Child`}
                    </Button>
                )}
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeField(currentPath)}
                    aria-label="Remove field"
                >
                    <Trash2 className="h-4 w-4 text-white" />
                </Button>
            </div>
            {isExpanded && typeof value === 'object' && value !== null && (
                <div className="ml-4 mt-2">
                    {Array.isArray(value)
                        ? value.map((item, index) => (
                              <JsonField
                                  parentType={'array'}
                                  key={index}
                                  keyName={String(index)}
                                  value={item}
                                  path={currentPath}
                                  updateField={updateField}
                                  removeField={removeField}
                                  addField={addField}
                              />
                          ))
                        : Object.entries(value).map(([subKey, subValue]) => (
                              <JsonField
                                  parentType="object"
                                  key={subKey}
                                  keyName={subKey}
                                  value={subValue}
                                  path={currentPath}
                                  updateField={updateField}
                                  removeField={removeField}
                                  addField={addField}
                              />
                          ))}
                </div>
            )}
        </div>
    );
}

export default function JsonBuilder() {
    const [json, setJson] = useState<{ [key: string]: JsonValue }>({});

    const addField = (path: string[] = []) => {
        setJson((prevJson) => {
            const newJson = { ...prevJson };
            let current = newJson;
            for (const key of path) {
                if (typeof current[key] === 'object' && current[key] !== null) {
                    current = current[key] as { [key: string]: JsonValue };
                }
            }
            if (Array.isArray(current)) {
                current.push('');
            } else {
                current[`newField${Object.keys(current).length}`] = '';
            }
            return newJson;
        });
    };

    const updateField = (path: string[], value: JsonValue) => {
        setJson((prevJson) => {
            const newJson = { ...prevJson };
            let current = newJson;
            for (let i = 0; i < path.length - 1; i++) {
                if (typeof current[path[i]] === 'object' && current[path[i]] !== null) {
                    current = current[path[i]] as { [key: string]: JsonValue };
                }
            }
            current[path[path.length - 1]] = value;
            return newJson;
        });
    };

    const removeField = (path: string[]) => {
        setJson((prevJson) => {
            const newJson = { ...prevJson };
            let current = newJson;
            for (let i = 0; i < path.length - 1; i++) {
                if (typeof current[path[i]] === 'object' && current[path[i]] !== null) {
                    current = current[path[i]] as { [key: string]: JsonValue };
                }
            }
            if (Array.isArray(current)) {
                current.splice(Number(path[path.length - 1]), 1);
            } else {
                delete current[path[path.length - 1]];
            }
            return newJson;
        });
    };

    return (
        <div className="space-y-4 rounded-lg bg-section p-4">
            <h2 className="text-2xl font-bold">Metadata Builder</h2>
            {Object.entries(json).map(([key, value]) => (
                <JsonField
                    parentType="object"
                    key={key}
                    keyName={key}
                    value={value}
                    path={[]}
                    updateField={updateField}
                    removeField={removeField}
                    addField={addField}
                />
            ))}
            <Button onClick={() => addField()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Root Field
            </Button>
            <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold">Metadata Output:</h3>
                <pre className="overflow-auto rounded-md bg-section p-4">
                    {JSON.stringify(json, null, 2)}
                </pre>
            </div>
        </div>
    );
}
