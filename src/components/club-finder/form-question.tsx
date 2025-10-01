"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Question, FormData } from "./form-config";
import { Check, Info } from "lucide-react";

interface FormQuestionProps {
  question: Question;
  value: FormData[keyof FormData];
  onChange: (value: string | string[] | boolean | number[]) => void;
}

export const FormQuestion: React.FC<FormQuestionProps> = ({
  question,
  value,
  onChange,
}) => {
  const renderQuestionInput = () => {
    switch (question.type) {
      case "radio":
        return (
          <RadioGroup
            value={(value as string) || ""}
            onValueChange={onChange}
            className='grid gap-3'
          >
            {question.options?.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`flex items-start space-x-3 space-y-0 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    value === option.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-400"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
                  }`}
                  onClick={() => onChange(option.value)}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className='mt-1'
                  />
                  <div className='flex-1 space-y-1'>
                    <div className='font-medium leading-none'>
                      {option.label}
                    </div>
                    {option.description && (
                      <div className='text-sm text-gray-600 dark:text-gray-400'>
                        {option.description}
                      </div>
                    )}
                  </div>
                  {value === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className='text-blue-600 dark:text-blue-400'
                    >
                      <Check className='w-4 h-4' />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        const selectedValues = (value as string[]) || [];

        return (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {question.options?.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Label
                  htmlFor={option.value}
                  className={`flex items-start space-x-3 space-y-0 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedValues.includes(option.value)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-400"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
                  }`}
                >
                  <Checkbox
                    id={option.value}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...selectedValues, option.value]);
                      } else {
                        onChange(
                          selectedValues.filter((v) => v !== option.value)
                        );
                      }
                    }}
                    className='mt-1'
                  />
                  <div className='flex-1 space-y-1'>
                    <div className='font-medium leading-none'>
                      {option.label}
                    </div>
                    {option.description && (
                      <div className='text-sm text-gray-600 dark:text-gray-400'>
                        {option.description}
                      </div>
                    )}
                  </div>
                </Label>
              </motion.div>
            ))}
          </div>
        );

      case "select":
        return (
          <Select value={(value as string) || ""} onValueChange={onChange}>
            <SelectTrigger className='w-full h-12 text-left'>
              <SelectValue placeholder='Choose an option...' />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className='py-3'
                >
                  <div>
                    <div className='font-medium'>{option.label}</div>
                    {option.description && (
                      <div className='text-sm text-gray-600 dark:text-gray-400'>
                        {option.description}
                      </div>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "switch":
        return (
          <Card className='p-4 cursor-pointer'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <div className='font-medium'>
                  {(value as boolean) ? "Yes, I am active" : "No, not really"}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  {(value as boolean)
                    ? "Great! You'll fit right into social media savvy clubs"
                    : "No worries! Many clubs don't require social media activity"}
                </div>
              </div>
              <Switch
                checked={(value as boolean) || false}
                onCheckedChange={onChange}
              />
            </div>
          </Card>
        );

      case "slider":
        const sliderValue =
          Array.isArray(value) && typeof value[0] === "number"
            ? (value as unknown as number[])
            : [50];
        return (
          <div className='space-y-4'>
            <Slider
              value={sliderValue}
              onValueChange={onChange}
              max={100}
              min={0}
              step={10}
              className='w-full'
            />
            <div className='flex justify-between text-sm text-gray-600 dark:text-gray-400'>
              <span>Low</span>
              <Badge variant='secondary' className='text-xs'>
                {sliderValue[0]}%
              </Badge>
              <span>High</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='space-y-6'
    >
      {/* Question Header */}
      <div className='text-center space-y-3'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight'>
          {question.title}
        </h2>
        {question.description && (
          <div className='flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            <Info className='w-4 h-4 flex-shrink-0 mt-0.5' />
            <p className='text-base leading-relaxed'>{question.description}</p>
          </div>
        )}
        {question.required && (
          <Badge variant='secondary' className='text-xs'>
            Required
          </Badge>
        )}
      </div>

      {/* Question Input */}
      <div className='max-w-3xl mx-auto'>{renderQuestionInput()}</div>

      {/* Selection Summary for multi-select */}
      {question.type === "checkbox" &&
        Array.isArray(value) &&
        value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className='text-center'
          >
            <div className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
              Selected {value.length}{" "}
              {value.length === 1 ? "option" : "options"}:
            </div>
            <div className='flex flex-wrap justify-center gap-2'>
              {value.map((selectedValue) => {
                const option = question.options?.find(
                  (opt) => opt.value === selectedValue
                );
                return option ? (
                  <Badge
                    key={selectedValue}
                    variant='default'
                    className='text-xs'
                  >
                    {option.label}
                  </Badge>
                ) : null;
              })}
            </div>
          </motion.div>
        )}
    </motion.div>
  );
};
