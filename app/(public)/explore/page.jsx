"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "convex/react";

import React from "react";

const ExplorePage = () => {
  // Fetch current user for location
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

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
    </>
  );
};

export default ExplorePage;
