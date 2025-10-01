"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  Users,
  TrendingUp,
  X,
} from "lucide-react";
import {
  FormData,
  FORM_QUESTIONS,
  DEFAULT_FORM_DATA,
  Question,
} from "./form-config";
import { FormQuestion } from "./form-question";
import { FormResults } from "./form-results";
import { ClubData } from "@/types/club";

interface ClubFinderFormProps {
  clubData: ClubData[];
  onClose: () => void;
}

export const ClubFinderForm: React.FC<ClubFinderFormProps> = ({
  clubData,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter questions based on conditions
  const getVisibleQuestions = (): Question[] => {
    return FORM_QUESTIONS.filter((question) => {
      if (!question.conditional) return true;

      const { dependsOn, showWhen } = question.conditional;
      const dependentValue = formData[dependsOn];

      if (Array.isArray(showWhen)) {
        return Array.isArray(dependentValue)
          ? showWhen.some((value) => dependentValue.includes(value))
          : showWhen.includes(dependentValue as string);
      }

      return Array.isArray(dependentValue)
        ? dependentValue.includes(showWhen)
        : dependentValue === showWhen;
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const totalSteps = visibleQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setDirection("forward");
      setCurrentStep(currentStep + 1);
      // Reset scroll to top
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection("backward");
      setCurrentStep(currentStep - 1);
      // Reset scroll to top
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFormDataChange = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setCurrentStep(0);
    setFormData(DEFAULT_FORM_DATA);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <FormResults
        formData={formData}
        clubData={clubData}
        onClose={onClose}
        onRestart={resetForm}
      />
    );
  }

  const currentQuestion = visibleQuestions[currentStep];

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className='w-full max-w-4xl max-h-[90vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col'
      >
        {/* Header */}
        <div className='flex-shrink-0 space-y-3 pb-3 px-6 pt-6 rounded-t-2xl'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full'>
                <Sparkles className='w-6 h-6 text-white' />
              </div>
              <div>
                <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Find Your Perfect Club
                </CardTitle>
                <CardDescription className='text-gray-600 dark:text-gray-400'>
                  Let&apos;s discover the ideal clubs and chapters for you!
                </CardDescription>
              </div>
            </div>

            <Button
              variant='ghost'
              size='sm'
              onClick={onClose}
              className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer'
            >
              <X className='w-5 h-5' />
            </Button>
          </div>

          {/* Progress */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-400'>
                Question {currentStep + 1} of {totalSteps}
              </span>
              <Badge variant='secondary' className='text-xs'>
                {Math.round(progress)}% Complete
              </Badge>
            </div>
            <Progress
              value={progress}
              className='h-2 bg-gray-200 dark:bg-gray-700'
            >
              <div
                className='h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out'
                style={{ width: `${progress}%` }}
              />
            </Progress>
          </div>

          <Separator />
        </div>

        {/* Form Content */}
        <div
          ref={scrollContainerRef}
          className='flex-1 overflow-y-auto p-6 overflow-x-hidden custom-scrollbar'
          style={{ maxHeight: "calc(100vh - 320px)" }}
        >
          <div className='space-y-6'>
            <AnimatePresence mode='wait' custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction === "forward" ? 50 : -50,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: direction === "forward" ? -50 : 50,
                  scale: 0.95,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.3,
                }}
                className='space-y-6'
              >
                {currentQuestion && (
                  <FormQuestion
                    question={currentQuestion}
                    value={formData[currentQuestion.id]}
                    onChange={(value: string | string[] | boolean | number[]) =>
                      handleFormDataChange({ [currentQuestion.id]: value })
                    }
                  />
                )}

                {/* Step Indicators */}
                <div className='flex items-center justify-center gap-2 pt-4'>
                  {visibleQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        index === currentStep
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 w-8"
                          : index < currentStep
                          ? "bg-green-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className='flex-shrink-0 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t rounded-b-2xl'>
          <div className='flex items-center justify-between'>
            <Button
              variant='outline'
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className='flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed'
            >
              <ChevronLeft className='w-4 h-4' />
              Previous
            </Button>

            <div className='flex items-center gap-4'>
              {/* Quick Stats */}
              <div className='hidden sm:flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
                <div className='flex items-center gap-1'>
                  <Target className='w-4 h-4' />
                  <span>{clubData.length} clubs</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Users className='w-4 h-4' />
                  <span>Perfect matches awaiting</span>
                </div>
              </div>

              <Button
                onClick={handleNext}
                className='flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer'
              >
                {currentStep === totalSteps - 1 ? (
                  <>
                    Get Results
                    <TrendingUp className='w-4 h-4' />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className='w-4 h-4' />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
