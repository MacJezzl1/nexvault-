type Props = {
  title: string;
  children: React.ReactNode;
};

export function Modal({ title, children }: Props) {
  return (
    <div className="rounded-[2rem] bg-white/90 p-6 shadow-vault">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
