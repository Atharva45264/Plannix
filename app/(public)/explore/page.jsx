"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Calendar, MapPin, Users, ArrowRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";


import React, { useRef } from "react";
import { useRouter } from "next/navigation";

const ExplorePage = () => {
  // Fetch current user for location
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const plugin = useRef(Autoplay({delay: 5000, stopOnInteraction: true}));
  const router = useRouter();

  const { data: featuredEvents, isLoading: LoadingFeatured } = useConvexQuery(
    api.explore.getFeaturedEvents,
    { limit: 3 }
  );

  const { data: localEvents, isLoading: loadingLocal } = useConvexQuery(
    api.explore.getEventsByLocation,
    {
      city: currentUser?.location?.city || "Gurugram",
      state: currentUser?.location?.state || "Haryana",
      limit: 4,
    }
  );

  const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(
    api.explore.getPopularEvents,
    { limit: 6 }
  );

  const { data: categoryCounts } = useConvexQuery(
    api.explore.getCategoryCounts
  );

  const handleEventClick = (slug) => {
    router.push(`/events/${slug}`);
  }

  const handleViewLocalEvents = () => {
    const city = currentUser?.location?.city || "Mumbai";
    const state = currentUser?.location?.state || "Maharashtra";
    const slug = createLocationSlug(city, state);
    router.push(`/explore/${slug}`);
  };

  return(
    <>
      {/* Hero Title */}
      <div className="pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Events</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore featured events, find what&apos;s happening locally, or browse
          events across India
        </p>
      </div>

      {/* Featured Carousel */}
      {featuredEvents && featuredEvents.length > 0 && (
        <div className="mb-16">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {featuredEvents.map((event) => (
                <CarouselItem key={event._id}>
                  <div
                    className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => handleEventClick(event.slug)}
                  >
                    {event.coverImage ? (
                      <Image
                        src={event.coverImage}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: event.themeColor }}
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/30" />
                    <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                      <Badge className="w-fit mb-4" variant="secondary">
                        {event.city}, {event.state || event.country}
                      </Badge>
                      <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                        {event.title}
                      </h2>
                      <p className="text-lg text-white/90 mb-4 max-w-2xl line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-white/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {format(event.startDate, "PPP")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{event.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">
                            {event.registrationCount} registered
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      )}
    </>
  );
};

export default ExplorePage;
