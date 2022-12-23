import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// FIXME Move Domain Entity to another file
interface Meme {
  id: number;
  src: string;
  title: string;
  description: string;
  views: number;
  date: string;
}

export const useMemeDetailById = (id?: string) => {
  /**
   * TODO
   *  api layer: response transform to domain entity
   */
  const { data } = useQuery({
    queryKey: ["meme", id],
    queryFn: () =>
      axios.get<Meme>(`http://13.124.200.247:8080/meme/${id}`).then(({ data }) => data),
  });

  return { ...data };
};
