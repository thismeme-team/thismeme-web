import { clsx } from "clsx";
import type { ChangeEventHandler } from "react";
import { Fragment, useRef } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { Icon } from "@/common/components/Icon";
import { UploadNavigation } from "@/common/components/Navigation";
import { useToast } from "@/common/hooks";
import { ResizingWrapper, UploadMemeData } from "@/features/upload/components";

// NOTE: tags1 ~ tags5 프로퍼티 이름이 시멘틱하게 변경될 수 있음
export interface MemeFormValues {
  memes: {
    image: string | ArrayBuffer | null;
    title: string;
    tags1: string[];
    tags2: string[];
    tags3: string[];
    tags4: string[];
    tags5: string[];
  }[];
}

const uploadButtonStyle = {
  focus: "focus:border-gray-100 focus:text-gray-600 [&_*]:focus:stroke-gray-600",
  hover: "hover:border-gray-100 hover:text-gray-600 [&_*]:hover:stroke-gray-600",
  active: "active:border-gray-400 active:text-gray-800 [&_*]:active:stroke-gray-800",
  disabled: "disabled:border-gray-400 disabled:text-gray-300 [&_*]:disabled:stroke-gray-300",
};

const MAX_FIELDS_LENGTH = 10;

const defaultValues = {
  memes: [{ image: null, title: "", tags1: [], tags2: [], tags3: [], tags4: [], tags5: [] }],
};

const UploadPage = () => {
  const toast = useToast();

  const methods = useForm<MemeFormValues>({
    defaultValues: defaultValues,
  });
  const {
    handleSubmit,
    control,
    setError,
    formState: { isDirty },
  } = methods;

  const { fields, append, remove, update } = useFieldArray({
    name: "memes",
    control,
    rules: { maxLength: MAX_FIELDS_LENGTH },
  });
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onAddMemeImages = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      return;
    }
    const filesLength = e.target.files.length;
    const imageArray = Array.from(e.target.files);

    if (filesLength + fields.length > MAX_FIELDS_LENGTH) {
      toast.show("최대 10개까지 업로드 가능합니다.");
      setError(`root.maxLength`, {
        type: "maxLengthError",
        message: "최대 10개까지 업로드 가능합니다.",
      });
      imageArray.splice(MAX_FIELDS_LENGTH - fields.length + (isDirty ? 0 : 1));
    }

    imageArray.forEach((image, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        const field = {
          image: reader.result,
          title: "",
          tags1: [],
          tags2: [],
          tags3: [],
          tags4: [],
          tags5: [],
        };

        if (!isDirty && index === 0) {
          // NOTE: 밈 업로드 폼 상태가 변경되지 않았다면 첫번째 필드 값을 교체합니다.
          update(index, field);
          return;
        }
        append(field);
      };
      reader.readAsDataURL(image);
    });
    toast.show(`${filesLength > 1 ? "여러" : filesLength}개의 밈을 선택했어요!`, {
      className: "mb-16 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]",
    });
  };

  const handleChangeMemeImage: (index: number) => ChangeEventHandler<HTMLInputElement> =
    (index) => (e) => {
      if (!e.target.files) return;
      const reader = new FileReader();
      reader.onload = () => {
        const field = {
          image: reader.result,
          title: "",
          tags1: [],
          tags2: [],
          tags3: [],
          tags4: [],
          tags5: [],
        };
        update(index, field);
      };
      reader.readAsDataURL(e.target.files[0]);

      toast.show("밈 이미지가 변경되었습니다.");
    };

  const onSumbit = () => {
    /**
     * TODO
     * - 밈 업로드 로직 작성
     * 1. 백엔드에서 S3 presigned URL 가져오기
     * 2. presigned URL로 이미지 업로드하기
     * 3. 밈 데이터를 서버로 전송하기(S3 URL, 밈 데이터)
     */
  };

  return (
    <>
      <UploadNavigation />
      <FormProvider {...methods}>
        <form className="flex flex-col gap-16 pt-16 pb-60" onSubmit={handleSubmit(onSumbit)}>
          {fields.map((field, index) => {
            return (
              <Fragment key={field.id}>
                <ResizingWrapper focus={index === 0} key={field.id}>
                  <button
                    className="absolute top-16 left-16 h-40 w-40 -translate-x-8 -translate-y-8 rounded-full transition-colors duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-100"
                    type="button"
                  >
                    <Icon className="m-auto" color="gray-600" name="meatball" />
                  </button>

                  {fields.length > 1 && (
                    <button
                      className="absolute top-16 right-16 h-40 w-40 translate-x-8 -translate-y-8 rounded-full transition-colors duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-100"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <Icon className="m-auto" height={24} name="delete3" width={24} />
                    </button>
                  )}

                  <div className="w-full rounded-24 px-16">
                    {field.image === null ? (
                      <>
                        <button
                          className="flex aspect-square w-full flex-col items-center justify-center gap-16 rounded-16 bg-gray-200"
                          type="button"
                          onClick={onAddMemeImages}
                        >
                          <div className="flex cursor-pointer items-center gap-6 rounded-26 bg-primary-700 px-24 py-14 text-16-semibold-140 text-white hover:bg-primary-500 focus:bg-primary-500 active:bg-primary-800">
                            <Icon height={24} name="memeShare" stroke="white" width={24} />
                            업로드
                          </div>
                          <ul className="list-disc text-left text-12-regular-160 text-gray-700">
                            <li>jpg, jpeg, gif, png 이미지만 올릴 수 있어요.</li>
                            <li>10MB 미만의 이미지를 권장해요.</li>
                            <li>사이즈는 0 : 0 비율로 추천해요!</li>
                          </ul>
                        </button>
                      </>
                    ) : (
                      <label
                        className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-16 rounded-16 bg-gray-200"
                        htmlFor={`meme-${index}`}
                      >
                        <input
                          hidden
                          id={`meme-${index}`}
                          type="file"
                          onChange={handleChangeMemeImage(index)}
                        />
                        {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
                        <img alt="밈 이미지 미리보기" src={field.image as string} />
                      </label>
                    )}
                  </div>
                  <ResizingWrapper.Hidden>
                    <UploadMemeData index={index} />
                  </ResizingWrapper.Hidden>
                </ResizingWrapper>
              </Fragment>
            );
          })}

          <label
            htmlFor="meme-uploader"
            className={clsx(
              "mx-auto flex w-fit gap-6 rounded-26 border border-gray-300 bg-white px-24 py-14 text-16-semibold-140 text-gray-700",
              Object.values(uploadButtonStyle),
              // NOTE: 값을 건드리지 않았거나 업로드한 밈이 10개가 되면 업로드 버튼을 숨깁니다.
              (!isDirty || fields.length === 10) && "hidden",
            )}
          >
            <input
              hidden
              multiple
              id="meme-uploader"
              ref={hiddenFileInput}
              type="file"
              onChange={handleChange}
            />
            <Icon className="h-24 w-24" name="memeShare" stroke="gray-700" />
            추가 업로드
          </label>
        </form>
      </FormProvider>
    </>
  );
};

export default UploadPage;
