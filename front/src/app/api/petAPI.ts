import { IpetForm } from "@/interfaces/types";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined");
}

// post - registrar una mascota
export const postPet = async (formData: FormData): Promise<IpetForm> => {
  try {
    const response = await fetch(`${API_URL}/pets`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    Swal.fire({
      title: "¡Mascota registrada con éxito! 🌟",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al enviar el formulario";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se logró enviar el formulario",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    console.error("Error al enviar el formulario:", errorMessage);
    throw error;
  }
};

// read - obtener las mascotas relacionadas al usuario
export async function getPetsByUser(id: string): Promise<IpetForm[] | []> {
  try {
    const response = await fetch(`${API_URL}/user/${id}/pets`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al obtener las mascotas del usuario";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se logró obtener las mascotas del usuario",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    console.error("Error al obtener las mascotas del usuario:", errorMessage);
    throw error;
  }
}

// update - modificar el estado de una mascota
export async function updatePetStatus(petId: string): Promise<IpetForm | null> {
  try {
    const updateResponse = await fetch(`${API_URL}/pets/${petId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "lost" }),
    });

    if (!updateResponse.ok) {
      throw new Error(
        `Error ${updateResponse.status}: ${updateResponse.statusText}`
      );
    }
    Swal.fire({
      title: "Estado de la mascota actualizado",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    const updatedPet: IpetForm = await updateResponse.json();
    console.log("Mascota actualizada:", updatedPet);
    return updatedPet;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al modificar el estado";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se logró modificar el estado de la mascota",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    console.error("Error al modificar el status:", errorMessage);
    throw error;
  }
}

// delete - eliminar una mascota
export async function deletePet(petId: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/pets/${petId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    Swal.fire({
      title: "Mascota eliminada con éxito 🌟",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al eliminar la mascota";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se logró eliminar la mascota",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });

    console.error("Error al eliminar la mascota:", errorMessage);
    throw error;
  }
}