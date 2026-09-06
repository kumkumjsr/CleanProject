from django.core.management.base import BaseCommand
from dustbins.models import Dustbin
from dustbins.utils import generate_dustbin_qr


class Command(BaseCommand):
    help = "Regenerate QR codes for all dustbins"

    def handle(self, *args, **options):

        dustbins = Dustbin.objects.filter(
            is_active=True
        ).order_by("id")

        count = 0

        for dustbin in dustbins:

            # QR code regenerate
            qr_url = generate_dustbin_qr(dustbin)

            count += 1

            self.stdout.write(
                self.style.SUCCESS(
                    f"{dustbin.name} | "
                    f"{dustbin.bin_id} | "
                    f"{qr_url}"
                )
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"\nSuccessfully regenerated QR codes for {count} dustbins."
            )
        )