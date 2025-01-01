'use client'

import Container from "@/app/_components/Container"

type Props = {}

const CheckOut = (props: Props) => {
  return (
    <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[29px]">
            <div>
                right
            </div>
            <div>
                left
            </div>

        </div>

    </Container>
  )
}

export default CheckOut