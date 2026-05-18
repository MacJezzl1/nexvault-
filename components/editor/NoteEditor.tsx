type Props = {
  name?: string;
  defaultValue?: string;
};

export function NoteEditor({ name = "content", defaultValue = "" }: Props) {
  return (
    <textarea
      name={name}
      defaultValue={defaultValue}
      className="min-h-[320px] w-full rounded-[1.5rem] border border-black/10 bg-white/80 p-4 outline-none"
      placeholder="Write a note, paste research, or save a decision record."
    />
  );
}
