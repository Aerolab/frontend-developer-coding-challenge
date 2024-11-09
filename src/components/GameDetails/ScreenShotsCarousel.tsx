import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { GameDetails } from "@/types/games"

const baseUrl = "https://images.igdb.com/igdb/image/upload"

export default function ScreenShotsCarousel({ game }: { game: GameDetails }) {
  if (!game.screenshots) {
    return null
  }

  const screenshotCarouselThumbUrl = baseUrl + "/t_thumb"
  const screenshotCarouselBigUrl = baseUrl + "/t_cover_big"

  return (
    <div>
      <h2 className="text-base">Media</h2>
      <div className="px-12">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {game.screenshots.map((item, index) => (
              <CarouselItem key={item.id} className="pl-1 basis-1/4 md:basis-1/5">
                <Dialog modal>
                  <DialogTrigger className="w-full">
                    <div className="aspect-square overflow-hidden rounded-lg cursor-pointer">
                      <img
                        srcSet={`${screenshotCarouselThumbUrl}/${item.image_id}.jpg 90w, ${screenshotCarouselBigUrl}/${item.image_id}.jpg 264w`}
                        sizes="(max-width: 638px) 90px, 264px"
                        alt={`Screenshot ${item.id}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-[889px] p-0 rounded-md">
                    <DialogHeader className="hidden">
                      <DialogTitle className="text-sm p-0 m-0">screenshot</DialogTitle>
                      <DialogDescription>Screenshot img of the game</DialogDescription>
                    </DialogHeader>

                    <CarouselInsideModal game={game} selectedImageIndex={index} />
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

function CarouselInsideModal({
  game,
  selectedImageIndex,
}: {
  game: GameDetails
  selectedImageIndex: number
}) {
  const screenshotSmallUrl = baseUrl + "/t_screenshot_med"
  const screenshotBigUrl = baseUrl + "/t_screenshot_big"

  return (
    <Carousel
      opts={{
        startIndex: selectedImageIndex,
      }}
      className="w-full mx-auto"
    >
      <CarouselContent>
        {game.screenshots.map((screenshot) => (
          <CarouselItem key={screenshot.image_id} className="mx-auto flex">
            <img
              srcSet={`${screenshotSmallUrl}/${screenshot.image_id}.jpg 569w, ${screenshotBigUrl}/${screenshot.image_id}.jpg 889w`}
              sizes="(max-width: 680px) 569px, (min-width: 681px) 889px"
              alt={`Screenshot ${screenshot.id}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2" />
      <CarouselNext className="absolute right-2" />
    </Carousel>
  )
}
