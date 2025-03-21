"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

const data = [
  { name: "Thứ 2", orders: 12 },
  { name: "Thứ 3", orders: 15 },
  { name: "Thứ 4", orders: 18 },
  { name: "Thứ 5", orders: 14 },
  { name: "Thứ 6", orders: 20 },
  { name: "Thứ 7", orders: 25 },
  { name: "CN", orders: 16 },
]

export function OrdersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn hàng theo ngày</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Bar
              dataKey="orders"
              fill="#8884d8"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 