'use client';
import { useTranslations } from 'next-intl';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Plus, Settings, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Variable {
  key: string;
  value: string;
  description: string;
}

export default function VariablesPage() {
  const t = useTranslations('VariablesPage');
  const [variables, setVariables] = useState<Variable[]>([]);
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addVariable = () => {
    if (!key || !value) return;
    setVariables([...variables, { key, value, description }]);
    setKey("");
    setValue("");
    setDescription("");
  };

  const deleteVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const editVariable = (index: number) => {
    const variableToEdit = variables[index];
    setKey(variableToEdit.key);
    setValue(variableToEdit.value);
    setDescription(variableToEdit.description);
    
    deleteVariable(index);
  };
  return (
    <div className="p-6 space-y-3 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-muted-foreground">
         {t('subtitlePart1')} {t('subtitlePart2')} <code>{"{{variableName}}"}</code>
      </p>

      <Card className="p-4">
        <Label className="text-lg font-semibold flex items-center gap-2">
          <Plus className="h-6 w-6" /> {t('addVariable')}
        </Label>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-0">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="key">{t('key')}</Label>
            <Input
              id="key"
              className="bg-gray-100 text-gray-800"
              placeholder={t('keyPlaceholder')}
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="value">{t('value')}</Label>
            <Input
              id="value"
              className="bg-gray-100 text-gray-800"
              placeholder={t('valuePlaceholder')}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">{t('description')}</Label>
            <Input
              id="description"
              className="bg-gray-100 text-gray-800"
              placeholder={t('descriptionPlaceholder')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
        <div className="flex justify-start">
          <Button disabled={!key || !value} onClick={addVariable}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('addVariable')}
          </Button>
        </div>
      </Card>

      {variables.length === 0 ? (
        <p className="text-gray-500 text-sm border rounded-md p-4 flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>{t('noVariables')}</span>
        </p>
      ) : (
        <div className="space-y-2 border rounded-md p-4">
           <h3 className="mb-4">{t('yourVariables')} ({variables.length})</h3>
            {variables.map((v, i) => (
              <Card key={i} className="p-4 border">
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t('key')}</p>
                      <p>{`{{${v.key}}}`}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t('value')}</p>
                      <p>{v.value}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t('description')}</p>
                      <p className="text-gray-600">{v.description || "-"}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => editVariable(i)}>
                      {t('edit')}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteVariable(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      )}

      <div className="flex items-start space-x-2 text-gray-600 text-sm border rounded-md p-4">
        <Settings className="h-7 w-7 mt-0.5" />
        <p>
          {t('howToUsePart1')} <code>{"{{variableName}}"}</code> {t('howToUsePart2')} {t('howToUsePart3')} <code>{"{{API_BASE_URL}}/users"}</code> {t('howToUsePart4')}
        </p>
      </div>
    </div>
  );
}
