interface Props {
text: string;
}

export default function RequiredLabel({
text,
}: Props) {
return ( <label className="mb-2 block text-sm font-medium">
{text} <span className="ml-1 text-red-500">
* </span> </label>
);
}
