"use client";

import { useEffect, useRef } from "react";

type DeleteBlogDialogProps = {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteBlogDialog = ({
  title,
  onCancel,
  onConfirm,
}: DeleteBlogDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const onCancelRef = useRef(onCancel);

  useEffect(() => {
    onCancelRef.current = onCancel;
  }, [onCancel]);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancelRef.current();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="delete-dialog-title"
          className="text-lg font-semibold text-stone-900"
        >
          Delete post
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Do you want to delete “{title}”?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogDialog;
