import { useEffect } from "react";

import { channelService } from "@/infra/sdk";
import type { User } from "@/types";

interface Props {
  user?: User;
}
export const useChannelIO = ({ user }: Props) =>
  useEffect(() => {
    if (user) {
      const { name, email } = user;
      channelService.boot({
        pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
        memberId: email,
        profile: {
          name,
          email,
        },
      });
    } else {
      channelService.boot({
        pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
      });
    }
    return () => {
      channelService.shutdown();
    };
  }, [user]);
