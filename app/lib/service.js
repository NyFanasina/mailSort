import axiosInstance from "@/app/lib/fetcher";

export async function fetchMessages(category) {
  const params = category === "tous" ? undefined : { category };
  const response = await axiosInstance.get("/messages", {
    params,
  });

  return response.data;
}

export async function authenticate(payload) {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
}

export async function fetchStats() {
  const response = await axiosInstance.get("/messages/stats");
  return response.data;
}

export async function MutateCategory({ id, category }) {
  const response = await axiosInstance.patch(`/messages/${id}/category`, { category });
  return response.data;
}
