'use client';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { OrderFormValues } from '../order-form';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface FileButtonProps {
  form: UseFormReturn<OrderFormValues>;
}

export default function FileButton({ form }: FileButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);
    form.setValue('files', files);
    form.trigger('files');
  };

  const handleRemoveFile = (name: string) => {
    setSelectedFiles((files) => {
      const updated = files.filter((file) => file.name !== name);
      form.setValue('files', updated);
      form.trigger('files');
      return updated;
    });
  };

  return (
    <FormField
      control={form.control}
      name="files"
      render={() => {
        return (
          <FormItem>
            <FormControl>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Додати файл"
                  tabIndex={0}
                  onClick={handleButtonClick}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleButtonClick();
                  }}
                  className="font-inter focus:ring-accent flex h-[50px] w-[258px] cursor-pointer items-center justify-center gap-3 bg-[#00ACA4] text-[16px] font-medium tracking-wider text-white uppercase transition hover:bg-[#009a92] focus:ring-2 focus:outline-none disabled:opacity-60"
                  disabled={form.formState.isLoading || form.formState.isSubmitting}
                >
                  <Image src="/figma-images/order/icon.svg" alt="icon" width={22} height={20} />
                  {form.formState.isSubmitting ? 'Відправка...' : 'Додати файл'}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                  />
                </button>
                <div className="flex flex-col">
                  {selectedFiles.map((file) => (
                    <span
                      key={file.name}
                      className="text-textDark flex items-center gap-2 text-[14px]"
                    >
                      {file.name}
                      <button
                        type="button"
                        aria-label={`Удалить файл ${file.name}`}
                        tabIndex={0}
                        className="ml-1 rounded p-1 hover:bg-gray-200 focus:bg-gray-200"
                        onClick={() => handleRemoveFile(file.name)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') handleRemoveFile(file.name);
                        }}
                      >
                        <X
                          className="h-4 w-4 text-gray-400 hover:text-red-500"
                          aria-hidden="true"
                        />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
