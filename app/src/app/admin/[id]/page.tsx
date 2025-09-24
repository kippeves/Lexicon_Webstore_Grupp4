import ProductForm from "@/components/admin/product-form";
import { ContentWrapper } from "@/components/content-wrapper";
import { getBrandsByProducts, getProduct } from "@/lib/data/products";
import { Edit } from "../actions";

type Props = { params: Promise<{ [key: string]: string | undefined }> };

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const productId = params.id ? Number(params.id) : undefined;

  if (!productId) return { title: "Not Found" };

  const product = getProduct(productId);
  const brands = getBrandsByProducts();
  const data = await Promise.all([product, brands]);
  return (
    <ContentWrapper>
      <ProductForm
        initialState={data[0]}
        brands={data[1]}
        serverAction={Edit}
        submitButtonText='Update Product'
      />
    </ContentWrapper>
  );
}
