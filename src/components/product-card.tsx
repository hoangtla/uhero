import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  title: string
  price: number
  description: string
  inStock: boolean
}

export function ProductCard({ title, price, description, inStock }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${price}</p>
        <Badge variant={inStock ? "default" : "destructive"}>
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button disabled={!inStock}>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
} 