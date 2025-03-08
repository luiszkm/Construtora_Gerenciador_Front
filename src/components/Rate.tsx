import { Star } from "lucide-react";

type RateProps = {
    rate: number;
    obs: string;
}

export function Rate({ rate, obs }: RateProps) {
    return (
        <div className="flex items-center"
         title={obs}>
          {
            Array.from({ length: 5 }, (_, index) => {
                return (
                    <Star
                        key={index}
                        size={12}
                        color={index < rate ? "#ff8c00" : "#331c00"}
                        stroke={index < rate ? "#ff8c00" : "#331c00"}
                        fill={index < rate ? "#ff8c00" : "transparent"}
                    />
                )
            })
          }
        </div>
    )
}