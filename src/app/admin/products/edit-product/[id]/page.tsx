interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditProduct({ params }: Props) {
    const { id } = await params;
    console.log(id);

    return (
        <div>
            <h1>Editing Product {id}</h1>
            {/* Your edit form here */}
        </div>
    );
}