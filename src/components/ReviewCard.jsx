import React from 'react'
import { Card, CardContent } from './ui/card'
import { StarIcon } from 'lucide-react';
const stars = Array(5).fill(
  <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
);
export const ReviewCard = ({ name, describe }) => {
  return (
    <Card className="bg-Blue text-white [direction:rtl] rounded-3xl border-0 shadow-md">
      <CardContent className="flex flex-col items-center justify-start gap-4">
        <h2>{name}</h2>
        <p>{describe}</p>
        <div className="inline-flex items-center justify-center gap-1">
          {stars.map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
